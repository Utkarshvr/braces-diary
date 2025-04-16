import { Colors, TextField, View } from "react-native-ui-lib";
import { useState } from "react";
import { ViewStyle } from "react-native";

type Props = {};

const fieldStyle: ViewStyle = {
  backgroundColor: Colors.$backgroundNeutral,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  borderWidth: 0,
};

export default function ClinicInfoForm({}: Props) {
  const [formData, setFormData] = useState({
    doctorName: "",
    clinicName: "",
    address: "",
    emails: [""],
    phones: [""],
    notes: "",
  });

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateArrayField = (
    key: "emails" | "phones",
    value: string,
    index: number
  ) => {
    const updated = [...formData[key]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const addField = (key: "emails" | "phones") => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const inputFields = [
    {
      key: "doctorName",
      placeholder: "Doctor Name",
      keyboardType: "default",
      autoCapitalize: "words" as const,
    },
    {
      key: "clinicName",
      placeholder: "Clinic Name",
      keyboardType: "default",
      autoCapitalize: "words" as const,
    },
    {
      key: "address",
      placeholder: "Clinic Address",
      keyboardType: "default",
      autoCapitalize: "sentences" as const,
      multiline: true,
      numberOfLines: 3,
    },
    {
      key: "notes",
      placeholder: "Additional Notes",
      keyboardType: "default",
      autoCapitalize: "sentences" as const,
      multiline: true,
      numberOfLines: 4,
    },
  ];

  return (
    <View gap-s4>
      {inputFields.map((field) => (
        <TextField
          key={field.key}
          placeholder={field.placeholder}
          //   keyboardType={field.keyboardType}
          autoCapitalize={field.autoCapitalize}
          floatingPlaceholder
          multiline={field.multiline}
          numberOfLines={field.numberOfLines}
          value={formData[field.key as keyof typeof formData] as string}
          onChangeText={(val) => updateField(field.key, val)}
          fieldStyle={fieldStyle}
          floatingPlaceholderStyle={{
            top:
              formData[field.key as keyof typeof formData].length > 0 ? -10 : 0,
          }}
        />
      ))}

      {formData.emails.map((email, index) => (
        <TextField
          key={`email-${index}`}
          placeholder={`Email ${index + 1}`}
          keyboardType="email-address"
          autoCapitalize="none"
          floatingPlaceholder
          value={email}
          onChangeText={(val) => updateArrayField("emails", val, index)}
          fieldStyle={fieldStyle}
        />
      ))}

      <TextField
        placeholder="Add Another Email"
        editable={false}
        onPressIn={() => addField("emails")}
        fieldStyle={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          opacity: 0.5,
        }}
      />

      {formData.phones.map((phone, index) => (
        <TextField
          key={`phone-${index}`}
          placeholder={`Phone ${index + 1}`}
          keyboardType="phone-pad"
          autoCapitalize="none"
          floatingPlaceholder
          value={phone}
          onChangeText={(val) => updateArrayField("phones", val, index)}
          fieldStyle={fieldStyle}
        />
      ))}

      <TextField
        placeholder="Add Another Phone"
        editable={false}
        onPressIn={() => addField("phones")}
        fieldStyle={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          opacity: 0.5,
        }}
      />
    </View>
  );
}
