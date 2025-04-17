import {
  Button,
  Colors,
  Dialog,
  KeyboardAwareScrollView,
  PanningProvider,
  Text,
  TextField,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/SessionStore";
import { UserInfoType } from "@/types/supabase-table-types";

type Props = {};

const fieldStyle: ViewStyle = {
  backgroundColor: Colors.$backgroundNeutral,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  borderWidth: 0,
};

export default function ClinicInfoForm({}: Props) {
  const [formData, setFormData] = useState<{
    doctorName: string;
    clinicName: string;
    address: string;
    phones: { name: string; number: string; key: string }[];
    notes: string;
  }>({
    doctorName: "",
    clinicName: "",
    address: "",
    phones: [],
    notes: "",
  });

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addField = (
    key: "phones",
    val: { name: string; number: string; key: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [val, ...prev[key]],
    }));
  };

  const inputFields: {
    key: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    autoCapitalize?: "words" | "sentences" | "none" | "characters" | undefined;
    multiline: boolean;
    numberOfLines?: number;
  }[] = [
    {
      key: "doctorName",
      placeholder: "Doctor Name",
      keyboardType: "default",
      autoCapitalize: "words" as const,
      multiline: false,
    },
    {
      key: "clinicName",
      placeholder: "Clinic Name",
      keyboardType: "default",
      autoCapitalize: "words" as const,
      multiline: false,
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

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: "add" | "edit";
    phone_state: { name: string; number: string; key: string };
  }>({
    isOpen: false,
    type: "add",

    phone_state: { name: "", number: "", key: "" },
  });

  function openPhoneDialog() {
    setDialogState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }

  const dialogTextFieldsArray: {
    key: "name" | "number";
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
    autoCapitalize?: "words" | "sentences" | "none" | "characters" | undefined;
  }[] = [
    {
      key: "name",
      placeholder: "Name",
      keyboardType: "default",
      autoCapitalize: "words",
    },
    {
      key: "number",
      placeholder: "Number",
      keyboardType: "number-pad",
    },
  ];

  function updatePhoneNumber(val: {
    name: string;
    number: string;
    key: string;
  }) {
    const newPhones = formData.phones.map((p) => {
      if (p.key === val.key) return val;
      else return p;
    });
    setFormData((prev) => ({ ...prev, phones: newPhones }));
  }

  const { userInfo, setUserInfo } = useSessionStore();
  const [isSavingInfo, setIsSavingInfo] = useState(false);

  async function saveInfo() {
    setIsSavingInfo(true);

    const newClinicInfo = {
      user_id: userInfo?.id,

      // clinic-info
      doctor_name: formData.doctorName,
      clinic_name: formData.clinicName,
      address: formData.address,
      notes: formData.notes,
      phones: formData.phones,
    };
    const { error } = await supabase.from("clinic-info").upsert(newClinicInfo);
    setUserInfo({ ...userInfo, clinic_info: newClinicInfo } as UserInfoType);

    if (error) return console.log(error);

    setIsSavingInfo(false);
  }

  useEffect(() => {
    setFormData({
      doctorName: userInfo?.clinic_info?.doctor_name || "",
      clinicName: userInfo?.clinic_info?.clinic_name || "",
      address: userInfo?.clinic_info?.address || "",
      notes: userInfo?.clinic_info?.notes || "",
      phones: userInfo?.clinic_info?.phones || [],
    });
  }, []);

  return (
    <KeyboardAwareScrollView>
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

      <View marginT-16>
        <Text montSemiBold $textNeutral>
          Phone Numbers
        </Text>
        {formData.phones.map((phone, index) => (
          <View
            row
            gap-s1
            style={{ justifyContent: "space-between" }}
            key={phone.key}
            center
          >
            <Text montSemiBold $textNeutralHeavy>
              {phone.name}
            </Text>
            <TouchableOpacity
              style={{ flex: 0.8 }}
              onPress={() => {
                setDialogState((prev) => ({
                  isOpen: !prev.isOpen,
                  type: "edit",
                  phone_state: phone,
                }));
              }}
            >
              <TextField
                key={`phone-${index}`}
                placeholder={`Phone ${index + 1}`}
                keyboardType="phone-pad"
                autoCapitalize="none"
                floatingPlaceholder
                editable={false}
                value={phone.number}
                fieldStyle={fieldStyle}
              />
            </TouchableOpacity>
          </View>
        ))}

        <View marginT-12 center>
          <Button
            iconSource={() => (
              <Ionicons name="add" color={Colors.$iconDefault} size={18} />
            )}
            size="xSmall"
            style={{ width: 44, height: 44 }}
            backgroundColor={Colors.$backgroundNeutralMedium}
            center
            // onPress={() => addField("phones")}
            onPress={openPhoneDialog}
          />
        </View>
      </View>

      <Button
        marginT-16
        label={isSavingInfo ? "" : "Save"}
        size="medium"
        bg-$backgroundNeutralMedium
        color={Colors.$textNeutral}
        onPress={saveInfo}
        // disabled={!isDurationDifferent}
        disabledBackgroundColor={Colors.$backgroundNeutral}
      >
        {isSavingInfo && (
          <ActivityIndicator size={"small"} color={Colors.$textNeutral} />
        )}
      </Button>

      <Dialog
        overlayBackgroundColor={"rgba(0,0,0,0.7)"}
        useSafeArea
        top
        center
        bottom
        panDirection={PanningProvider.Directions.DOWN}
        containerStyle={{
          backgroundColor: Colors.$backgroundDefault,
          borderRadius: 12,
        }}
        visible={dialogState.isOpen}
        onDismiss={() => console.log("dismissed")}
        pannableHeaderProps={"HAHAHAHA"}
        ignoreBackgroundPress
      >
        <View padding-16>
          <Text montBold>
            {dialogState.type === "add" ? "Add Phone" : "Update Phone"}
          </Text>

          {dialogTextFieldsArray.map((field) => (
            <TextField
              key={field.key}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              autoCapitalize={field.autoCapitalize}
              floatingPlaceholder
              value={
                dialogState.phone_state[
                  field.key as keyof typeof dialogState.phone_state
                ] as string
              }
              onChangeText={(val) => {
                setDialogState((prev) => ({
                  ...prev,
                  phone_state: {
                    ...dialogState.phone_state,
                    [field.key as keyof typeof dialogState.phone_state]: val,
                  },
                }));
              }}
              fieldStyle={fieldStyle}
              floatingPlaceholderStyle={{
                top:
                  dialogState.phone_state[
                    field.key as keyof typeof dialogState.phone_state
                  ].length > 0
                    ? -10
                    : 0,
              }}
            />
          ))}

          <Button
            marginT-16
            label={"Done"}
            backgroundColor={Colors.$backgroundNeutralMedium}
            color={Colors.$textNeutral}
            size="medium"
            onPress={() => {
              dialogState.type === "add"
                ? addField("phones", {
                    ...dialogState.phone_state,
                    key: Math.random().toString(),
                  })
                : updatePhoneNumber(dialogState.phone_state);

              setDialogState((prev) => ({ ...prev, isOpen: false }));
            }}
          />
        </View>
      </Dialog>
    </KeyboardAwareScrollView>
  );
}
