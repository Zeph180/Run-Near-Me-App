import { AppLinearGradient } from "@/components/AppLinearGradient";
import { PageHeading } from "@/components/PageHeading";
import FormInput from "@/components/FormInput";
import React, { useContext, useState } from "react";
import DropDownSelector from "@/components/DropDownSelector";
import DatePickerField from "@/components/DatePickerField";
import { validateHeight } from "@/utils/validateHeight";
import { AuthContext } from "@/utils/authContext";
import { Button } from "@/components/Button";
import { authScreenStyles } from "@/styles/authScreenStyles";

export default function CompleteProfile() {
  const [username, setUsername] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [errors, setErrors] = useState<{
    height: string;
    weight: string;
    gender: string;
  }>({
    height: "",
    weight: "",
    gender: "",
  });
  const { user } = useContext(AuthContext);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  async function handleCreateProfile() {
    let valid = true;
    let tempErrors = { height: "", weight: "", gender: "" };
    const heightValidation = validateHeight(height);
    if (!heightValidation.isValid) {
      tempErrors.height = heightValidation.error;
      valid = false;
    }

    console.log("Start handle create profile");

    const weightValidation = validateHeight(weight);
    if (!weightValidation.isValid) {
      tempErrors.weight = weightValidation.error;
      valid = false;
    }

    setErrors(tempErrors);
    if (!valid) return;

    try {
      const data = {
        height,
        weight,
        gender,
        userId: user?.userId,
        dob: dateOfBirth,
      };

      console.log("SSSS", data);
    } catch (error) {
      console.log(error);
    }
  }

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
        error={errors.gender}
      />

      <FormInput
        label="Height"
        placeholder={"Enter your height in cm"}
        value={height}
        keyboardType="numeric"
        editable={true}
        onChangeText={setHeight}
        error={errors.height}
      />

      <FormInput
        label="Weight"
        placeholder={"Enter your weight in kg"}
        value={weight}
        keyboardType="numeric"
        editable={true}
        onChangeText={setWeight}
        error={errors.weight}
      />

      <DatePickerField
        value={dateOfBirth}
        onChange={setDateOfBirth}
        label="Date of birthhhh"
        maximumDate={new Date(Date.now() - 6 * 365 * 24 * 60 * 60 * 1000)}
        placeholder="Select your date of birth"
        mode="date"
        displayFormat="numeric"
      />

      <Button
        title="Submit"
        onPress={() => handleCreateProfile()}
        theme="lime"
        style={authScreenStyles.button}
      />
    </AppLinearGradient>
  );
}
