import { test, expect } from "@playwright/test";

test("Create a new user and verify response", async ({ request }) => {
  // Use the base URL defined in the config
  const response = await request.get("https://gorest.co.in/");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  console.log(response);
});
