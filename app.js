let canvas=document.querySelector(".canvas")
canvas.width = innerWidth 
canvas.height = innerHeight
let ctx=canvas.getContext("2d")
let ballIntensity = 1
let color_list = ["#4C4A59","#1B7F7A","#0897B4","#4CABA6","#F2CDAC"]
let Selection1 = [
    {x: (Math.floor(Math.random()*innerWidth)), y: -100},
    {x: (Math.floor(Math.random()*innerWidth)), y: innerHeight+100},
    {x: -100, y: (Math.floor(Math.random()*innerHeight))},
    {x: innerWidth+100, y: (Math.floor(Math.random()*innerHeight))}
]
function distanceMeasure(onepoint,secondpoint){
    let x_distance=Math.pow(((onepoint.x)-secondpoint.x),2)
    let y_distance=Math.pow(((onepoint.y)-secondpoint.y),2)
    return Math.sqrt(x_distance+y_distance)
}
function Player(position,conposn){
    let aimpoint ={x:innerWidth/2, y:innerHeight/2}
    this.position = position
    const fixposition = conposn
    this.radius = Math.floor(10*(Math.random()+1.5))
    this.velocity = 0.8
    this.color = color_list[Math.floor(4*Math.random())]

    this.show = function(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false)
        ctx.fill()
    }
    this.vardist = function(){
        let x_distance=Math.pow(((aimpoint.x)-this.position.x),2)
        let y_distance=Math.pow(((aimpoint.y)-this.position.y),2)
        return Math.sqrt(x_distance+y_distance)
    }
    this.hippotanus = function(){
        let x_distance=Math.pow(((aimpoint.x)-fixposition.x),2)
        let y_distance=Math.pow(((aimpoint.y)-fixposition.y),2)
        return Math.sqrt(x_distance+y_distance)
    }
    this.fixlengths = function(){
        let x_distance=Math.pow(((aimpoint.x)-fixposition.x),2)
        let y_distance=Math.pow(((aimpoint.y)-fixposition.y),2)
        return {x:Math.sqrt(x_distance), y:Math.sqrt(y_distance)}
    }
    this.move = function(){
        var hippo = this.hippotanus()
        var closeness = this.vardist()
        var length = this.fixlengths()
        if(closeness  < 10){
            this.position={x:aimpoint.x, y:aimpoint.y}
        }
        this.position.x+=this.velocity*((aimpoint.x-fixposition.x)/hippo)
        this.position.y+=this.velocity*((aimpoint.y-fixposition.y)/hippo)

    }
}
function Bullet(aimpoint){
    const fixposition = {x:innerWidth/2, y:innerHeight/2} 
    let startpoint = {x:innerWidth/2, y:innerHeight/2}
    this.position = startpoint
    this.aimpoint = aimpoint
    this.radius = 5
    this.velocity = 10
    this.color = color_list[Math.floor(4*Math.random())]
    this.show = function(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false)
        ctx.fill()
    }
    this.vardist = function(){
        let x_distance=Math.pow(((aimpoint.x)-this.position.x),2)
        let y_distance=Math.pow(((aimpoint.y)-this.position.y),2)
        return Math.sqrt(x_distance+y_distance)
    }
    this.fixlengths = function(){
        let x_distance=Math.pow(((aimpoint.x)-fixposition.x),2)
        let y_distance=Math.pow(((aimpoint.y)-fixposition.y),2)
        return {x:Math.sqrt(x_distance), y:Math.sqrt(y_distance)}
    }
    this.hippotanus = function(){
        let x_distance=Math.pow(((aimpoint.x)-fixposition.x),2)
        let y_distance=Math.pow(((aimpoint.y)-fixposition.y),2)
        return Math.sqrt(x_distance+y_distance)
    }
    this.move = function(){
        var hippo = this.hippotanus()
        this.position.x+=this.velocity*((aimpoint.x-fixposition.x)/hippo)
        this.position.y+=this.velocity*((aimpoint.y-fixposition.y)/hippo)
    }
}
function BlastParticles(position,fixposn){
    this.aimpoint = {x: Math.floor(Math.random()*innerWidth), y: Math.floor(Math.random()*innerHeight)}
    this.position = position
    this.fixposition = fixposn
    this.radius = 5
    this.velocity = 2
    this.color = color_list[Math.floor(4*Math.random())]
    this.show = function(){
       ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false)
        ctx.fill()
    }
    this.hippotanus = function(){
        let x_distance=Math.pow(((this.aimpoint.x)-this.fixposition.x),2)
        let y_distance=Math.pow(((this.aimpoint.y)-this.fixposition.y),2)
        return Math.sqrt(x_distance+y_distance)
    }
    this.move = function(){
        if (this.radius<1){
            this.radius=0
        }
        else{
            this.radius-=0.1
        }
        var hippo = this.hippotanus()
        this.position.x+=this.velocity*((this.aimpoint.x-this.fixposition.x)/hippo)
        this.position.y+=this.velocity*((this.aimpoint.y-this.fixposition.y)/hippo)
    }
}

let BlastParticlesList =[]
function blast(position){
    for (let i=0; i<20; i++){
        let particle = new BlastParticles({...position}, {...position})
        BlastParticlesList.push(particle)
    }
}

let bulletlist = []
addEventListener("mousemove",(e)=>{
    bulletlist.push(new Bullet({x:e.clientX, y:e.clientY}))
})




let allPlayers=[]
setInterval(() => {
    let Selection = [
        {x: (Math.floor(Math.random()*innerWidth)), y: -100},
        {x: (Math.floor(Math.random()*innerWidth)), y: innerHeight+100},
        {x: -100, y: (Math.floor(Math.random()*innerHeight))},
        {x: innerWidth+100, y: (Math.floor(Math.random()*innerHeight))}
    ]
    let gen = Selection[Math.floor(4*Math.random())]
    
    allPlayers.push(new Player(
        gen,gen                 
    ))
}, ballIntensity*100);


Player1 = new Player({x:innerWidth/2, y:innerHeight/2})
Player1.radius = 30
function loop(ctime){
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.fillRect(0,0,innerWidth,innerHeight)
    Player1.show()
    allPlayers.forEach((e, index)=>{
        e.move()
        e.show()     
        bulletlist.forEach((b)=>{
            let hitlength = distanceMeasure(e.position,b.position)
            if (hitlength<40){
                if (e.radius>10){
                    e.radius-=1
                }
                else{
                    blast({...e.position})
                    e.radius=0
                }
            }
        })   
        if(e.radius==0){
            allPlayers.splice(index, 1)    
        }
    })
    bulletlist.forEach((e, index)=>{
        e.move()
        e.show()
        
    })
    BlastParticlesList.forEach((e)=>{
        e.move()
        e.show()
    })


    last = ctime
    requestAnimationFrame(loop)
}
loop()

