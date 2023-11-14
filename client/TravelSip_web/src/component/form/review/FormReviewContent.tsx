import { Form, useFormikContext } from "formik";
import ReactStars from "react-stars";
import { ReusableButton, ReusableTextField } from "../..";
import { useNavigate } from "react-router-dom";

type ValueRating = {
  rating: number;
  id: number;
  review: string;
};

const FormReviewContent = () => {
  const { values, setFieldValue, errors } = useFormikContext<ValueRating>();
  const navigate = useNavigate();
  const handleRatingChange = (newRating: number) => {
    setFieldValue("rating", newRating);
  };
  return (
    <Form className="p-12 rounded-2xl border border-solid border-lightGrey">
      <h3 className="text-medium font-bold text-dark">Give us a review: </h3>
      <div className="flex flex-col my-20">
        <ReusableTextField
          name="review"
          id="outlined-multiline-flexible"
          label="Review"
          flex1={true}
        />
      </div>
      <p className="text-red">{errors.review}</p>
      <div className="flex items-center my-20">
        <p className="text-medium mr-12">Rating point:</p>
        <ReactStars
          count={5}
          value={values.rating}
          color2={"#ffd700"}
          size={30}
          onChange={handleRatingChange}
        />
        <p className="text-gray ml-12">{values.rating}/5 stars</p>
      </div>
      <p className="text-red">{errors.rating}</p>
      <div className="flex w-full justify-center">
        <ReusableButton
          textColor="text-red"
          bg="bg-white"
          border={true}
          borderColor="border-red"
          onClick={() => {
            navigate(-1);
          }}
          btnText="Back"
          width="w-[120px]"
        />
        <div className="w-[12px]"></div>
        <ReusableButton
          type="submit"
          textColor="text-white"
          bg="bg-green"
          onClick={() => {}}
          btnText="Submit"
          width="w-[120px]"
        />
      </div>
    </Form>
  );
};

export default FormReviewContent;
