const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, styled, Avatar } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { CustomAxios } from "../utils/CustomAxios";
import EmailSent from "../components/Modals/EmailSent.modal";
import { base_url } from "../utils/Constants";

type registrationFormType = {
  profile_img?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    control,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<registrationFormType>({
    defaultValues: {
      profile_img:
        "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInput?.current?.click();
  };

  const handlleFomSubmit = async (data: registrationFormType) => {
    const formData = new FormData();
    await fetch(data.profile_img!)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "filename", { type: blob.type });
        formData.append("profile", file);
      });
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      await axios.post(base_url + "/auth/register", formData);
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.response.data.message,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          border: "1px solid gray",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(handlleFomSubmit)}
        // autoComplete="off"
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={watch("profile_img")}
            sx={{ width: 120, height: 120, cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
          <Controller
            control={control}
            name="profile_img"
            render={({ field }) => (
              <input
                type="file"
                ref={fileInput}
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  console.log(url);
                  field.onChange(url);
                }}
              />
            )}
          />
        </Box>
        <TextField
          label="Name"
          variant="outlined"
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            minLength: {
              value: 3,
              message: "Min length should be 3",
            },
          })}
        />
        <Box color="red">{errors.name?.message}</Box>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
              message: "Invalid email address",
            },
          })}
        />
        <Box color="red">{errors.email?.message}</Box>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
              message:
                "Minimum eight characters, at least one letter and one number",
            },
          })}
        />
        <Box color="red">{errors.password?.message}</Box>
        <TextField
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
        />
        <Box color="red">{errors.confirmPassword?.message}</Box>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
        {errors.root && <Box color="red">{errors.root.message}</Box>}
      </Box>
      {isSubmitSuccessful && <EmailSent email={getValues("email")} />}
    </Box>
  );
}
