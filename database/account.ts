import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    email: String,
  },
  { timestamps: true }
);

const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
export default Account;
