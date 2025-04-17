import { Colors, TextField } from "react-native-ui-lib";
import { useEffect, useState } from "react";
import { KeyboardTypeOptions, ViewStyle } from "react-native";
import { useSessionStore } from "@/store/SessionStore";

type Props = {};

const fieldStyle: ViewStyle = {
  backgroundColor: Colors.$backgroundNeutral,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  borderWidth: 0,
};

export default function ProfileInfoForm({}: Props) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const inputFields: {
    key: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    autoCapitalize?: "words" | "sentences" | "none" | "characters" | undefined;
    multiline: boolean;
    editable: boolean;
    numberOfLines?: number;
  }[] = [
    {
      key: "name",
      placeholder: "Your Name",
      keyboardType: "default",
      autoCapitalize: "words" as const,
      multiline: false,
      editable: true,
    },
    {
      key: "email",
      placeholder: "Email",
      keyboardType: "email-address",
      autoCapitalize: "words" as const,
      multiline: false,
      editable: false,
    },
  ];

  const { session } = useSessionStore();

  useEffect(() => {
    if (!session?.user) return;
    setFormData((prev) => ({ ...prev, email: session.user.email || "" }));
  }, [session]);

  return (
    <>
      {inputFields.map((field) => (
        <TextField
          key={field.key}
          floatingPlaceholder
          editable={field.editable}
          placeholder={field.placeholder}
          keyboardType={field.keyboardType}
          autoCapitalize={field.autoCapitalize}
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
    </>
  );
}
