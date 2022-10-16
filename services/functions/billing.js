import Stripe from "stripe";
import handler from "../handler";

const PSP_SECRET_KEY = process.env.PSP_SECRET_KEY;

const costCalculator = (storage) => {
  const rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1;
  return rate * storage * 100;
};

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);

  const amount = costCalculator(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(PSP_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });
});
