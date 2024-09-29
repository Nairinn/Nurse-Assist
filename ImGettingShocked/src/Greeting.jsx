function Greeting(props){
    return(
    <div className="bg-gray-200 p-4 shadow-md">
        {props.isLoggedIn ? (
        <h1 className="text-6xl text-white">
          <span className="bg-customGreen bg-opacity-25">
            Good Day, Dr. {props.name}
          </span>
        </h1>
      ) : (
        <h1 className="text-m text-white">
          <span className="bg-customGreen bg-opacity-25">
            Please log in...
          </span>
        </h1>
      )}
    </div>
    )
}

export default Greeting
