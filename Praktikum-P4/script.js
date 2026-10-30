const btnBackToTop = document.getElementById("btnBackToTop");
const pixelCounter = document.getElementById("pixelCounter");

window.addEventListener("scroll", function () 
{
    const scrollDistance = Math.round(window.scrollY);

    pixelCounter.textContent = "Scroll: " + scrollDistance + "px";

    if (scrollDistance > 500) 
    {
        btnBackToTop.style.display = "block";
    } else 
    {
        btnBackToTop.style.display = "none";
    }
});

btnBackToTop.addEventListener("click", function () 
{
    window.scrollTo
    ({
        top: 0,
        behavior: "smooth"
    });
});
