import React from "react";
import useStoreSettings from "../../hooks/useStoreSettings";

/**
 * Contact block synced with admin Settings → General → Store Address.
 */
const StoreContactInfo = ({ className = "legal-contact-info" }) => {
  const { storeName, address, contactPhone, contactEmail } = useStoreSettings();

  return (
    <div className={className}>
      <p>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        <a href={`tel:${contactPhone.replace(/\s/g, "")}`}>{contactPhone}</a>
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p className="text-sm text-gray-500 mt-2">{storeName}</p>
    </div>
  );
};

export default StoreContactInfo;
