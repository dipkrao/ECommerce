import { useAppSelector } from "../store/hooks";

const DEFAULTS = {
  storeName: "HY Nutrition",
  storeDescription: "Premium supplements for peak performance",
  address: "123 Fitness Street, Gym City, GC 12345",
  contactPhone: "+91 00000 00000",
  contactEmail: "info@hynutrition.com",
  currency: "INR",
  timezone: "Asia/Kolkata",
  language: "en",
};

/**
 * Store settings from admin panel (via GET /api/settings/public).
 */
export function useStoreSettings() {
  const settings = useAppSelector((state) => state.settings?.data);
  const loading = useAppSelector((state) => state.settings?.loading);
  const error = useAppSelector((state) => state.settings?.error);
  const lastFetchedAt = useAppSelector((state) => state.settings?.lastFetchedAt);

  const storeName = settings?.storeName || settings?.name || DEFAULTS.storeName;
  const storeDescription =
    settings?.storeDescription ||
    settings?.tagline ||
    DEFAULTS.storeDescription;
  const address =
    settings?.address || settings?.storeAddress || DEFAULTS.address;
  const contactPhone =
    settings?.contactPhone ||
    settings?.phone ||
    settings?.supportPhone ||
    DEFAULTS.contactPhone;
  const contactEmail =
    settings?.contactEmail ||
    settings?.email ||
    settings?.supportEmail ||
    DEFAULTS.contactEmail;

  return {
    settings,
    loading,
    error,
    lastFetchedAt,
    storeName,
    storeDescription,
    address,
    contactPhone,
    contactEmail,
    currency: settings?.currency || DEFAULTS.currency,
    timezone: settings?.timezone || DEFAULTS.timezone,
    language: settings?.language || DEFAULTS.language,
    hasLiveSettings: Boolean(settings && lastFetchedAt),
  };
}

export default useStoreSettings;
