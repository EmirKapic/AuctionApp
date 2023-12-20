import Button from "components/Common/Button";

export default function Settings() {
  return (
    <div>
      <div className="border border-silver border-opacity-50 flex flex-col w-1/2">
        <h4 className="border bg-lightgrey-200 bg-opacity-10 py-3 px-8">
          Account
        </h4>
        <div className="px-8 py-3">
          <p>Do you want to deactivate your account?</p>
          <Button type="secondary" className="py-2 px-16 mt-5 uppercase">
            {/* what does deactivate mean? Should products be deleted if currently bid on? Should you even be able to delete if products are being sold?*/}
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  );
}
