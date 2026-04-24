import { describe, expect, it } from "vitest";
import {
  decryptSeed,
  encryptSeed,
  generatePassword,
  interleaveBytes
} from "@password-use/crypto-adapter";
import type { PasswordEntry } from "@password-use/sdk-types";

describe("crypto", () => {
  it("should encrypt and decrypt seed with same password", () => {
    const seed = "abandon ability able about above absent absorb abstract absurd abuse access accident";
    const encrypted = encryptSeed(seed, "master-pass");
    const decrypted = decryptSeed(encrypted, "master-pass");
    expect(decrypted).toBe(seed);
  });
});

describe("hash interleave", () => {
  it("should interleave bytes in order", () => {
    const a = Buffer.from([1, 2, 3]);
    const b = Buffer.from([9, 8]);
    expect(Array.from(interleaveBytes(a, b))).toEqual([1, 9, 2, 8, 3]);
  });
});

describe("password generator", () => {
  const seed = "seed phrase here";

  it("should be deterministic with same input", async () => {
    const entry: PasswordEntry = {
      name: "github",
      description: "test",
      sequence: 0,
      strength: "normal",
      length: 12
    };
    const p1 = await generatePassword(seed, entry);
    const p2 = await generatePassword(seed, entry);
    expect(p1).toBe(p2);
    expect(p1).toHaveLength(12);
    expect(/^[a-zA-Z0-9]+$/.test(p1)).toBe(true);
  });

  it("should satisfy number strength", async () => {
    const entry: PasswordEntry = {
      name: "bank",
      sequence: 2,
      strength: "number",
      length: 10
    };
    const password = await generatePassword(seed, entry);
    expect(password).toHaveLength(10);
    expect(/^[0-9]+$/.test(password)).toBe(true);
  });

  it("should satisfy strong strength and include special char", async () => {
    const entry: PasswordEntry = {
      name: "mail",
      sequence: 7,
      strength: "strong",
      length: 16
    };
    const password = await generatePassword(seed, entry);
    expect(password).toHaveLength(16);
    expect(/[!-/:-@[-`{-~]/.test(password)).toBe(true);
  });
});
