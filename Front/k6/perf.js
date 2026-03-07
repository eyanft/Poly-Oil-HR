import http from "k6/http";
import { check, fail, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 30 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<1500"],
  },
};

const BASE_URL = __ENV.BASE_URL || "https://polyoil.netlify.app";
const API_URL = __ENV.API_URL || "";
const ENABLE_API = (__ENV.ENABLE_API || "false").toLowerCase() === "true";

const names = ["Ali", "Sarra", "Youssef", "Meriem", "Nader", "Lina"];
const domains = ["mail.com", "test.com", "fake.io"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fakeUser() {
  const n = randomItem(names);
  const id = Math.floor(Math.random() * 1000000);
  return {
    name: `${n} ${id}`,
    email: `${n.toLowerCase()}${id}@${randomItem(domains)}`,
    phone: `+216${Math.floor(10000000 + Math.random() * 89999999)}`,
    company: `Company-${id}`,
  };
}

export function setup() {
  const home = http.get(`${BASE_URL}/`);
  if (home.status !== 200) {
    fail(`BASE_URL inaccessible: ${BASE_URL} (status=${home.status})`);
  }

  if (ENABLE_API && !API_URL) {
    fail("ENABLE_API=true mais API_URL est vide");
  }
}

export default function () {
  const pageReqs = [
    ["GET", `${BASE_URL}/`],
    ["GET", `${BASE_URL}/contact`],
  ];

  if (ENABLE_API) {
    pageReqs.push(["GET", `${API_URL}/health`]);
    pageReqs.push(["GET", `${API_URL}/products`]);
  }

  const pageRes = http.batch(pageReqs);

  check(pageRes[0], {
    "home 200": (r) => r.status === 200,
    "home has html": (r) => (r.headers["Content-Type"] || "").includes("text/html"),
  });

  // Sur un hébergement SPA, /contact peut répondre 200 (index.html) ou 404 selon config.
  check(pageRes[1], {
    "contact reachable": (r) => r.status === 200 || r.status === 404,
  });

  if (ENABLE_API) {
    check(pageRes[2], { "health 200": (r) => r.status === 200 });
    check(pageRes[3], { "products 200": (r) => r.status === 200 });

    const u = fakeUser();
    const quotePayload = JSON.stringify({
      name: u.name,
      email: u.email,
      phone: u.phone,
      company: u.company,
      productName: "Huile 15W40",
      message: "Demande de devis test charge k6",
    });

    const quoteRes = http.post(`${API_URL}/quote`, quotePayload, {
      headers: { "Content-Type": "application/json" },
    });

    check(quoteRes, {
      "quote acceptable": (r) => r.status === 200 || r.status === 503,
    });
  }

  sleep(1);
}
