import Button from "components/Common/Button";
import { fallbackImageUrl } from "defaultConstants";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import sectionHeader from "./sectionHeader";
import Input from "components/Common/Input";
import { minMaxNumberValidation } from "services/UseFormValidators";
import DragAndDrop from "components/Common/DragAndDrop";
import { useContext } from "react";
import { UserContext } from "contexts/UserContext";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthOptions = months.map((month, index) => {
  return {
    value: index,
    label: month,
  };
});

export interface PersonalInformationProps {
  monthOfBirth?: number;
  profileImage?: File;
  setProfileImage: (file: File) => void;
}

export default function PersonalInformation(props: PersonalInformationProps) {
  const methods = useFormContext();
  const userContext = useContext(UserContext);
  function handleImageUpload(files: Array<File>) {
    props.setProfileImage(files[0]);
  }

  return (
    <div className="border border-silver pb-5">
      {sectionHeader("Personal information")}
      <div className="flex">
        <div className="flex-shrink-0">
          <img
            src={
              props.profileImage
                ? URL.createObjectURL(props.profileImage)
                : userContext?.photoUrl || fallbackImageUrl
            }
            className="w-[32rem] h-[32rem] object-cover rounded-[100%] m-5"
          />
          <DragAndDrop onDrop={handleImageUpload} className="w-fit mx-auto">
            <Button type="primary" className="py-2 px-10 mt-5">
              Change photo
            </Button>
          </DragAndDrop>
        </div>
        <div className="flex-grow px-20 mt-8 flex flex-col gap-5">
          <Input type="text" id="firstName" label="First Name" />
          <Input type="text" id="lastName" label="Last Name" />
          <Input type="email" id="email" label="Email" disabled />
          <div className="flex gap-8 w-full">
            <Input
              type="number"
              id="dateOfBirthDay"
              placeholder="DD"
              className="w-20"
              validationOptions={minMaxNumberValidation(1, 31, "Invalid")}
            />
            <Select
              placeholder="MM"
              onChange={(val) => methods.setValue("dateOfBirthMonth", val)}
              options={monthOptions}
              defaultValue={
                props.monthOfBirth !== undefined
                  ? monthOptions[props.monthOfBirth]
                  : undefined
              }
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: "50px",
                }),
              }}
              className="w-full"
            />

            <Input
              type="number"
              id="dateOfBirthYear"
              placeholder="YYYY"
              validationOptions={minMaxNumberValidation(
                1900,
                new Date().getFullYear(),
                "Invalid year.",
              )}
            />
          </div>
          <Input
            type="string"
            id="phoneNumber"
            label="Phone Number"
            validationOptions={{
              pattern: {
                value: /^\+\d+$/,
                message: "Please enter a valid phone number",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
