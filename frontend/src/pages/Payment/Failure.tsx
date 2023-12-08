import Button from "components/Common/Button";

export default function Failure() {
  return (
    <div className="w-full flex flex-col gap-5 items-center mt-10">
      <h1 className="text-4xl text-pink-700">Ooops... Something went wrong.</h1>
      <p>Unfortunately we couldn't go on with your purchase.</p>
      <Button
        type="primary-filled"
        className="py-3 px-5 shadow-lightgrey w-56 hover:bg-opacity-80 duratipn-300"
      >
        Back to home
      </Button>
    </div>
  );
}
