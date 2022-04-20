// API DOCS: https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
const LIST_ID = process.env.MAILCHIMP_LIST_ID;
const API_KEY = process.env.MAILCHIMP_API_KEY;
const SERVER = API_KEY.split("-")[1];
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: API_KEY,
  server: SERVER
});

export default async function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: "subscribed",
      tags: ["website"]
    });

    return res.status(201).json({ error: "" });
  } catch (error) {
    const response = JSON.parse(error.response.text);

    const friendlyMessages = {
      ["Member Exists"]: "Hey! Looks like you're already signed up."
    };

    const message =
      friendlyMessages[response.title] ||
      "Hmm, looks like something not working right. Shoot us an email contact@obahoops.com and we'll get it sorted out.";

    return res.status(500).json({ error: message || error.toString() });
  }
}
