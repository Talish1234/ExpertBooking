import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { API_BASE } from "../config";
import { ErrorBox } from "../components/common";
import BookingSummary from "../components/bookings/BookingSummary";
import { validateBookingForm } from "../utils";
import globalStyles, { COLORS } from "../styles/global";

interface Expert {
  _id: string;
  name: string;
  hourlyRate: number;
}

interface BookingFormPageProps {
  expert: Expert;
  date: string;
  timeSlot: string;
  onSuccess: (data: any) => void;
  onBack: () => void;
}

interface BookingForm {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  notes: string;
}

const BookingFormPage: React.FC<BookingFormPageProps> = ({
  expert,
  date,
  timeSlot,
  onSuccess,
  onBack,
}) => {
  const [form, setForm] = useState<BookingForm>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: date || "",
    timeSlot: timeSlot || "",
    notes: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const change = (
    key: keyof BookingForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [key]: "",
      submit: "",
    }));
  };

  const submit = async () => {
    const validationErrors =
      validateBookingForm(form);

    if (
      Object.keys(validationErrors).length
    ) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `${API_BASE}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            expertId: expert._id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Booking failed"
        );
      }

      onSuccess(data.data);
    } catch (err: any) {
      setErrors((prev: any) => ({
        ...prev,
        submit: err.message,
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={[globalStyles.container,{ marginBottom: 12}]}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>
          ← Back to {expert.name}
        </Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Complete Your Booking
        </Text>

        <Text style={styles.subtitle}>
          Fill in your details to confirm
          the session
        </Text>

        <BookingSummary
          expert={expert}
          date={date}
          timeSlot={timeSlot}
        />

        {/* Full Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Full Name *
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.clientName &&
                styles.inputError,
            ]}
            placeholder="Jane Doe"
            placeholderTextColor={
              COLORS.muted
            }
            value={form.clientName}
            onChangeText={(text) =>
              change("clientName", text)
            }
          />

          {errors.clientName && (
            <Text style={styles.errorText}>
              {errors.clientName}
            </Text>
          )}
        </View>

        {/* Phone */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Phone *
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.clientPhone &&
                styles.inputError,
            ]}
            placeholder="+1 234 567 8900"
            placeholderTextColor={
              COLORS.muted
            }
            value={form.clientPhone}
            onChangeText={(text) =>
              change("clientPhone", text)
            }
            keyboardType="phone-pad"
          />

          {errors.clientPhone && (
            <Text style={styles.errorText}>
              {errors.clientPhone}
            </Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Email *
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.clientEmail &&
                styles.inputError,
            ]}
            placeholder="you@example.com"
            placeholderTextColor={
              COLORS.muted
            }
            value={form.clientEmail}
            onChangeText={(text) =>
              change("clientEmail", text)
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {errors.clientEmail && (
            <Text style={styles.errorText}>
              {errors.clientEmail}
            </Text>
          )}
        </View>

        {/* Date */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Date *
          </Text>

          <TextInput
            style={[
              styles.input,
              errors.date &&
                styles.inputError,
            ]}
            value={form.date}
            onChangeText={(text) =>
              change("date", text)
            }
            placeholder="YYYY-MM-DD"
            placeholderTextColor={
              COLORS.muted
            }
          />

          {errors.date && (
            <Text style={styles.errorText}>
              {errors.date}
            </Text>
          )}
        </View>

        {/* Time Slot */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Time Slot *
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.readOnlyInput,
            ]}
            value={form.timeSlot}
            editable={false}
          />
        </View>

        {/* Notes */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Notes (optional)
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="What would you like to discuss?"
            placeholderTextColor={
              COLORS.muted
            }
            value={form.notes}
            onChangeText={(text) =>
              change("notes", text)
            }
          />
        </View>

        {errors.submit && (
          <ErrorBox
            message={errors.submit}
          />
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            submitting &&
              styles.submitButtonDisabled,
          ]}
          disabled={submitting}
          onPress={submit}
        >
          <Text
            style={styles.submitButtonText}
          >
            {submitting
              ? "Confirming booking..."
              : "Confirm Booking →"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingFormPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 24,
  },

  backButtonText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
  },

  formContainer: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 24,
  },

  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.muted,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 14,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  readOnlyInput: {
    opacity: 0.8,
  },

  textArea: {
    minHeight: 100,
  },

  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },

  submitButton: {
    backgroundColor: COLORS.accent2,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },

  submitButtonDisabled: {
    opacity: 0.5,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});