import { Button, Colors, TextField, View } from "react-native-ui-lib";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";
import { useSessionStore } from "@/store/SessionStore";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { UserInfoType } from "@/types/supabase-table-types";

type Props = { isOnBoarding?: boolean };

const fieldStyle: ViewStyle = {
  backgroundColor: Colors.$backgroundNeutral,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  borderWidth: 0,
};

export default function ProfileInfoForm({ isOnBoarding = false }: Props) {
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
  }[] = isOnBoarding
    ? [
        {
          key: "name",
          placeholder: "Your Name",
          keyboardType: "default",
          autoCapitalize: "words" as const,
          multiline: false,
          editable: true,
        },
      ]
    : [
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

  const { userInfo, setUserInfo } = useSessionStore();

  useEffect(() => {
    if (!userInfo) return;
    setFormData((prev) => ({
      ...prev,
      email: userInfo.email || "",
      name: userInfo.name,
    }));
  }, [userInfo]);

  const [isSavingInfo, setIsSavingInfo] = useState(false);

  async function saveInfo() {
    if (!formData.name) return;
    setIsSavingInfo(true);

    const { status, error } = await supabase.from("users").upsert({
      id: userInfo?.id,
      name: formData.name,
    });

    if (status !== 200 && status !== 201) return console.log(error);

    setUserInfo({ ...userInfo, name: formData.name } as UserInfoType);

    if (isOnBoarding) {
      // Move back
      router.push("/(tabs)/home");
    }

    setIsSavingInfo(false);
  }

  return (
    <View gap-s6>
      <View gap-s2>
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
                formData[field.key as keyof typeof formData].length > 0
                  ? -10
                  : 0,
            }}
          />
        ))}
      </View>
      <Button
        label={isSavingInfo ? "" : "Save"}
        size="medium"
        bg-$backgroundNeutralMedium
        color={Colors.$textNeutral}
        onPress={saveInfo}
      >
        {isSavingInfo && <ActivityIndicator size={"small"} />}
      </Button>
    </View>
  );
}
