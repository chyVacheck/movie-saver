// constants.ts

export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  auth: {
    httpOnly: true,
    maxAge: 24 * 3600_000, // 24 hours
  },
};
