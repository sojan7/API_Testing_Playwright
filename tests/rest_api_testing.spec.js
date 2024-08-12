import { test, expect } from "@playwright/test";

test.describe("API Testing", () => {
  const baseUrl = "https://gorest.co.in";

  const generateRandomString = (length) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  test("Verify post User Endpoint", async ({ request }) => {
    const randomEmail = `testrandome_${generateRandomString(5)}@email.com`;
    const postresponse = await request.post(`${baseUrl}/public/v2/users`, {
      data: {
        email: randomEmail,
        name: "Sojan Somarajan",
        gender: "male",
        status: "active",
      },
    });
    expect(postresponse.status()).toBe(201);
    const postResponseBody = JSON.parse(await postresponse.text());
    const userId = postResponseBody.id;
    expect(postResponseBody.id).toBeTruthy();
    expect(postResponseBody.name).toEqual("Sojan Somarajan");
    expect(postResponseBody.email).toEqual(randomEmail);
    expect(postResponseBody.gender).toEqual("male");
    expect(postResponseBody.status).toEqual("active");
    console.log(postResponseBody);
    const getResponse = await request.get(
      `${baseUrl}/public/v2/users/${userId.toString()}`
    );
    expect(getResponse.status()).toBe(200);

    const getResponseBody = JSON.parse(await getResponse.text());
    console.log(getResponseBody);
  });
});
