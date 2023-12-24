import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Container from "components/Common/Container";
import DragAndDrop from "components/Common/DragAndDrop";
import Product from "models/Product";
import { NewProductRequest } from "pages/SellingProcess/SellForm";
import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";
import post from "services/fetching/Post";

export type SimpleMessageResponse = {
  message: string;
};

function formatDate(date: string): string {
  const timeFrames = date.split("/").map((str) => parseInt(str));
  return new Date(
    timeFrames[2],
    timeFrames[1] - 1,
    timeFrames[0],
    new Date().getUTCHours(),
  ).toISOString();
}

type UploadStatus = "not started" | "ongoing" | "done";

export default function CSVSelling() {
  const [file, setFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("not started");
  const [uploadedProducts, setUploadedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  function renderStatusMessage(): ReactNode {
    switch (uploadStatus) {
      case "not started":
        return (
          <Button
            type="primary"
            className="mx-auto py-2 px-8 uppercase font-bold"
            onClick={handleFileUpload}
          >
            Confirm upload
          </Button>
        );
      case "ongoing":
        return (
          <p className="text-purple text-center">
            Please hold on while we upload your products.
          </p>
        );
      case "done":
        return uploadedProducts.length === 0 ? (
          <p>
            Unfortunately we couldn't upload your products. Please check your
            CSV to make sure its formatted correctly.
          </p>
        ) : (
          <div>
            <p className="text-lg">
              Successfully uploaded following products:
              <ul className="list-disc pl-10">
                {uploadedProducts.map((prod) => (
                  <li key={prod.id} className="text-purple">
                    <button
                      onClick={() => navigate(`/shop/products/${prod.id}`)}
                    >
                      {prod.name}
                    </button>
                  </li>
                ))}
              </ul>
            </p>
          </div>
        );
    }
  }

  async function handleFileUpload(): Promise<void> {
    const fileText = await file!.text();
    const rows = fileText.split("\n");
    const productRequests = rows.map((row) => {
      const columns = row.split(",");
      const product: NewProductRequest = {
        title: columns[0],
        subcategoryName: columns[2],
        description: columns[3],
        imageUrls: columns[4].substring(1, columns[4].length - 1).split("|"),
        startPrice: parseFloat(columns[5]),
        startDate: formatDate(columns[6]),
        endDate: formatDate(columns[7]),
        address: columns[8],
        city: columns[9],
        zipCode: columns[10],
        country: columns[11],
        phoneNumber: columns[12],
      };
      return product;
    });
    console.log(productRequests);
    setUploadStatus("ongoing");
    const res = await post<Product[], NewProductRequest[]>(
      new UrlBuilder().products().makeAll().url,
      productRequests,
    );
    setUploadedProducts(res.data);
    setUploadStatus("done");
  }

  return (
    <div>
      <Breadcrumb
        title="Seller"
        items={[
          { title: "My accout", to: "/account" },
          { title: "Upload CSV" },
        ]}
      />
      <Container type="small" className="border border-silver my-10">
        <h1 className="text-center text-2xl bg-lightgrey-100 py-3">
          Sell products via CSV
        </h1>
        <div className="p-5">
          <p className="text-lg">
            <Link
              className="text-purple pr-2"
              to={"/files/example.csv"}
              target="_blank"
            >
              Click here
            </Link>
            for an example on how to format your CSV.
          </p>
          <p className="text-lg">
            All rows which are not correctly formatted and/or contain bad
            information will be <strong>ignored</strong>.
          </p>
          <DragAndDrop
            onDrop={(files) => {
              setFile(files[0]);
              setUploadStatus("not started");
            }}
            className="py-4 border mt-10 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-purple font-bold text-2xl">
                Click To Upload CSV
              </h3>
              <p className="text-lg">or just drag and drop it</p>
            </div>
          </DragAndDrop>

          {file && (
            <>
              <p className="pb-3 text-sm">Uploaded file: {file?.name}</p>
              <div>{renderStatusMessage()}</div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
