import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const simultaneousRequests = process.env.SIMULTANEOUS_REQUESTS || 1;
let totalRequests = 0;

if (!process.env.URL) {
  throw new Error("Missing URL environment variable.");
}

const api = axios.create({
  baseURL: process.env.URL,
});

const request = async (label) => {
  let res;
  try {
    res = await api.get("/");
  } catch (error) {
  } finally {
    console.log("request", label, "status", res?.status || "-");
    totalRequests++;
  }
};

while (true) {
  const requests = [];
  for (
    let requestLabel = 1;
    requestLabel <= simultaneousRequests;
    requestLabel++
  ) {
    requests.push(request(requestLabel));
  }
  await Promise.all(requests);
  console.log("total requests", totalRequests);
}
