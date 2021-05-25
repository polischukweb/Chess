var map = Array ();
var inf = Array ();
var move_color = "white";
var move_from_x;
var move_from_y;

function init_map()
{
    // map [x] [y]
    map = 
    [
    //   y=0  y=1 y=2  y=3 y=4  y=5 y=6  y=7 
        ["R", "P"," ", " "," ", " ","p", "r"], // x=0
        ["N", "P"," ", " "," ", " ","p", "n"], // x=1
        ["B", "P"," ", " "," ", " ","p", "b"], // x=2
        ["Q", "P"," ", " "," ", " ","p", "q"], // x=3
        ["K", "P"," ", " "," ", " ","p", "k"], // x=4
        ["B", "P"," ", " "," ", " ","p", "b"], // x=5
        ["N", "P"," ", " "," ", " ","p", "n"], // x=6
        ["R", "P"," ", " "," ", " ","p", "r"]  // x=7
    ];
}

function init_inf()
{
    // map [x] [y]
    inf = 
    [
    //   y=0  y=1 y=2  y=3 y=4  y=5 y=6  y=7 
        [" ", " "," ", " "," ", " "," ", " "], // x=0
        [" ", " "," ", " "," ", " "," ", " "], // x=1
        [" ", " "," ", " "," ", " "," ", " "], // x=2
        [" ", " "," ", " "," ", " "," ", " "], // x=3
        [" ", " "," ", " "," ", " "," ", " "], // x=4
        [" ", " "," ", " "," ", " "," ", " "], // x=5
        [" ", " "," ", " "," ", " "," ", " "], // x=6
        [" ", " "," ", " "," ", " "," ", " "]  // x=7
    ];
}

function marks_moves_from ()
{
    init_inf ();
    for (var x = 0; x <=7; x ++)
    for (var y = 0; y <=7; y ++)
        if (can_move_from(x,y))
        inf [x] [y] = 1;
}

function marks_moves_to ()
{
    init_inf ();
    for (var x = 0; x <=7; x ++)
    for (var y = 0; y <=7; y ++)
        if (can_move_to(x,y))
        inf [x] [y] = 2;
}

function can_move_from(x,y)
{
    return get_color(x,y) == move_color;
}

function can_move_to(x,y)
{
    if (map [x] [y] == " ")
    return true;
    return get_color(x,y) != move_color;
}

function get_color(x,y)
{
    var figure = map [x] [y];
    if (figure == " ")
    return " ";
    return (figure.toUpperCase() == figure) ? "white" : "black";
}

function click_box(x,y)
{
    if (inf [x] [y] == "1")
    click_box_from (x,y);
    if (inf [x] [y] == "2")
    click_box_to (x,y);
}

function click_box_from (x,y)
{
    move_from_x = x;
    move_from_y = y;
    marks_moves_to();
    show_map();
}

function click_box_to (x,y)
{
    map [x] [y] = map [move_from_x] [move_from_y];
    map [move_from_x] [move_from_y] = " ";
    turn_move();
    marks_moves_from();
    show_map();
}

function turn_move()
{
    if (move_color == "white")
    move_color = "black";
    else
    move_color = "white";
}

function figure_to_html (figure)
{
    switch (figure)
    {
        case "K" : return "&#9812"; case "k" : return "&#9818";
        case "Q" : return "&#9813"; case "q" : return "&#9819";
        case "R" : return "&#9814"; case "r" : return "&#9820";
        case "B" : return "&#9815"; case "b" : return "&#9821";
        case "N" : return "&#9816"; case "n" : return "&#9822";
        case "P" : return "&#9817"; case "p" : return "&#9823";
        default : return "&nbsp";
    }

}

function show_map ()
{
    html = "<table class='table' cellspacing='0' cellpadding='2'>";
    for (var y=7; y >= 0; y --)
    {
    html += "<tr>";
        for (var x=0; x <= 7; x ++)
        {
            if (inf [x] [y] == " ")
                color = (x + y) % 2 ? "#dfbb97" : "#904f39";
            else color = inf [x] [y] == "1" ? "#71e64a" : "#f46652";
        html += "<td class='cell' style='background:" + color + ";' onclick='click_box(" + x + ", " + y + ");'>";
        html += figure_to_html (map [x] [y]);
        html += "</td>";
        }
    html += "</tr>";
    }
    html += "</table>";
    document.getElementById ("board").innerHTML = html;
}

init_map ();
marks_moves_from ();
show_map ();