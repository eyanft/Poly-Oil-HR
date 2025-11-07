import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

function createAccessToken(payload) {
  const secret = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
  const expiresIn = process.env.JWT_ACCESS_EXPIRES || '15m';
  return jwt.sign(payload, secret, { expiresIn });
}

function createRefreshToken(payload) {
  const secret = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret';
  const expiresIn = process.env.JWT_REFRESH_EXPIRES || '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(409).json({ message: 'admin already exists' });

    const passwordHash = await Admin.hashPassword(password);
    const admin = await Admin.create({ email, passwordHash, role: 'admin' });
    return res.status(201).json({ id: admin._id.toString(), email: admin.email, role: admin.role });
  } catch (err) {
    return res.status(500).json({ message: 'registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'invalid credentials' });

    const ok = await admin.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });

    const payload = { sub: admin._id.toString(), role: admin.role, email: admin.email };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken, user: { id: payload.sub, email: admin.email, role: admin.role } });
  } catch (err) {
    return res.status(500).json({ message: 'login failed' });
  }
}

export async function refresh(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: 'no refresh token' });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret');
    const accessToken = createAccessToken({ sub: payload.sub, role: payload.role, email: payload.email });
    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'invalid refresh token' });
  }
}

export async function logout(req, res) {
  res.clearCookie('refreshToken');
  return res.json({ ok: true });
}

export async function me(req, res) {
  return res.json({ id: req.user.sub, email: req.user.email, role: req.user.role });
}


