export interface KnownClaims {
  sub: string
  email: string
}

export function tokenToClaims(token: string): KnownClaims {
  // Split the JWT token into parts
  const parts = token.split(".")
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token format")
  }

  // Decode the payload (middle part)
  let payload: string
  try {
    // atob() decodes base64
    payload = atob(parts[1])
  } catch (error) {
    throw new Error("Failed to decode JWT payload")
  }

  // Parse the payload as JSON
  let payloadJson: KnownClaims
  try {
    payloadJson = JSON.parse(payload)
  } catch (error) {
    throw new Error("Failed to parse JWT payload JSON")
  }

  // Check for existence of supported claims
  if (!payloadJson.sub) {
    throw new Error("JWT token does not contain a sub claim")
  }
  if (!payloadJson.email) {
    throw new Error("JWT token does not contain an email claim")
  }

  return payloadJson
}