let availableKeywords = [
   'butter', 'chicken', 'cream', 'spices',
'beef', 'mushrooms', 'pastry', 'mustard',
'lettuce', 'croutons', 'parmesan', 'anchovies',
'rice noodles', 'shrimp', 'peanuts', 'bean sprouts',
'fish', 'tortilla', 'cabbage', 'lime',
'noodles', 'broth', 'pork', 'egg',
'broccoli', 'bell peppers', 'carrots', 'soy sauce',
'shrimp', 'garlic', 'butter', 'lemon',
'chickpeas', 'cumin', 'tahini', 'pita bread'
]
const resulBox=document.querySelector(".result-box");
const inputBox=document.getElementById("search-input");

document.getElementById('clear-btn').addEventListener('click', closefunction);

function closefunction(){
    inputBox.value='';
}
inputBox.onkeyup=function(){
    let res=[];
    let input=inputBox.value;
    if(input.length){
        res=availableKeywords.filter((keyword)=>{
           return  keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(res);
    }
    display(res);
    if(!res.length){
        resulBox.innerHTML='';
    }
    
}
function display(res){
    const content=res.map((list)=>{
        return "<li onclick=select(this)>" +list+ "</li>";
    });
    resulBox.innerHTML = "<ul>"+content.join('')+"</ul>";
}
function select(list){
    inputBox.value=list.innerHTML;
    resulBox.innerHTML='';
}


document.getElementById('search-btn').addEventListener('click', getMealList);
function getMealList() {
    let searchInputTxt=document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
    .then(data => {
        let html = "";
        console.log(data)
        if (data.meals) {
            data.meals.forEach(meal => {
            html +=`
                <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
                </div>
                `;
        });
        } else {
             html="No meals found!";
        }
        document.getElementById('meal-list').innerHTML = html;
    })
    .catch(error => {
        console.log(error);
     });
        document.getElementById('meal-list').innerHTML="Error fetching data. Please try again later.";
 }