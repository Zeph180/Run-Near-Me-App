import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import FormInput from "@/components/FormInput";
import { useState } from "react";
import DropDownSelector from "@/components/DropDownSelector";

export default function CompleteProfile() {
  const [username, setUsername] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    new Date().toLocaleDateString("en-GB"),
  );
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <AppLinearGradient>
      <PageHeading
        heading={"Complete Profile"}
        hasNotification={false}
        description="Hello there! Tell us about yourself"
      />

      <DropDownSelector
        label="Gender"
        value={gender}
        onChange={setGender}
        options={genderOptions}
        placeholder="Select your gender"
      />

      <FormInput
        label="Height"
        placeholder={"Enter your height in cm"}
        value={height}
        keyboardType="numeric"
        editable={true}
        onChangeText={setHeight}
      />

      <FormInput
        label="Weight"
        placeholder={"Enter your weight in kg"}
        value={weight}
        keyboardType="numeric"
        editable={true}
        onChangeText={setHeight}
      />

      <FormInput
        label="Date of Birth"
        placeholder={"Enter your height in cm"}
        value={dateOfBirth}
        keyboardType="numeric"
        editable={true}
        onChangeText={setDateOfBirth}
      />
    </AppLinearGradient>
  );
}
