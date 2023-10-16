import Breadcrumb from "src/components/Common/Breadcrumb";

export default function PrivacyPolicy() {
  return (
    <div>
      <Breadcrumb
        title="privacy and policy"
        items={[
          { title: "shop", to: "/shop" },
          { title: "privacy and policy" },
        ]}
      />
      <main className="max-w-container-lg w-full mx-auto px-64 pt-12 pb-36 [&>p]:text-lg [&>p]:text-lightgrey-200">
        <h1 className="text-5xl pb-6">Privacy and policy</h1>
        <p className="pb-6">
          We respect your privacy and are committed to protecting it through our
          compliance with this privacy policy (“Policy”). This Policy describes
          the types of information we may collect from you or that you may
          provide (“Personal Information”) on the website (“Website” or
          “Service”) and any of its related products and services (collectively,
          “Services”), and our practices for collecting, using, maintaining,
          protecting, and disclosing that Personal Information. It also
          describes the choices available to you regarding our use of your
          Personal Information and how you can access and update it.
        </p>

        <p className="pb-6">
          This Policy is a legally binding agreement between you (“User”, “you”
          or “your”) and Atlantbh (“Atlantbh”, “we”, “us” or “our”). If you are
          entering into this Policy on behalf of a business or other legal
          entity, you represent that you have the authority to bind such entity
          to this Policy, in which case the terms “User”, “you” or “your” shall
          refer to such entity. If you do not have such authority, or if you do
          not agree with the terms of this Policy, you must not accept this
          Policy and may not access and use the Website and Services. By
          accessing and using the Website and Services, you acknowledge that you
          have read, understood, and agree to be bound by the terms of this
          Policy. This Policy does not apply to the practices of companies that
          we do not own or control, or to individuals that we do not employ or
          manage.
        </p>
      </main>
    </div>
  );
}
