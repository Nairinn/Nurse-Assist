function Card({title}){
    return(
    <div class="bg-white p-6 rounded-lg shadow-md m-5 w-60">
            <h2 class="text-2xl font-bold">{title}</h2>
            <p class="mt-2 text-gray-600">This is some content inside the first card.</p>
    </div>
    )
}

export default Card