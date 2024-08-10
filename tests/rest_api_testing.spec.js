import { test, expect } from "@playwright/test";
import { defineConfig } from "@playwright/test";

test("Create a new user and verify response", async ({
  request,
  defineConfig,
}) => {
  // Use the base URL defined in the config
  const response = await request.post("/v2/users", {
    // Headers are automatically set by the configuration
    data: {
      name: "John Doe",
      gender: "male",
      status: "active",
      email: "johndoe@example.com",
    },
  });
  console.log(response);

  // Verify the response status and body
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty(
    "message",
    "Resource created successfully."
  );
  expect(responseBody).toHaveProperty("id"); // Assuming 'id' is returned
});
