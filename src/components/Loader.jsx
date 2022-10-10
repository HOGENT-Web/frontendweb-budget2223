export default function Loader({ loading }) {
  if (loading) {
    return (
      <>
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </>
    );
  }

  return null;
}
