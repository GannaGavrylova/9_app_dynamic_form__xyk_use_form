import DinamicForm from "./DinamicForm.css";
import React from "react";
import { useForm } from "react-hook-form";

function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset, // функция для сброса (обнуления) полей формы
  } = useForm();

  const firstField = watch("firstField"); // следим за значением поля firstField

  console.log(firstField);

  // функция для обработки данных формы
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form_container">
      <div className="first_field">
        <label>First Field </label>
        <input
          {...register("firstField", {
            required: "First field is required",
            minLength: { value: 5, message: "Minimum 5 characters required" },
            maxLength: { value: 20, message: "Maximum 20 characters allowed" },
          })}
          //   добавляем динамический класс на основе ошибок валидации
          className={errors.firstField ? "error-border" : ""}
        />
        {/* ошибки валидации для первого поля  */}
        {errors.firstField && <p>{errors.firstField.message}</p>}
      </div>
      {/* второе поле появляется только если в первом поле минимум 5 символов */}
      {firstField && firstField.length >= 5 && (
        <div className="second_field">
          <label>Second Field </label> <input {...register("secondField")} />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;

/* <select {...register("selectOption")}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      {selectedOption === "option2" && (
        <input type="text" {...register("additionalInfo")} />
      )} */

//   function handleSubmit(event) {
//     event.preventDefault();
//     watch("");
//   }
