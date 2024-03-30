const Header = () => {
  return (
    <div className="container mx-auto my-1.5">
      <div className="flex justify-between items-center">
        <div className="w-4/1">
          <h1 className="header-style">Reservation</h1>
        </div>
        <div className="w-4/12 flex justify-end">
          <button className="print-button">Print / Download</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
