export default function setIsLoading(type, payload = true) {
  return {
    type,
    payload,
  };
}
