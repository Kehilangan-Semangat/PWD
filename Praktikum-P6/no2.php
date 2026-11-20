<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Latihan 2 - Tabel Perkalian Matrik</title>

<style>
table
{
    border-collapse: collapse;
    text-align: center;
}

th, td
{
    border: 1px solid #000;
    padding: 6px 10px;
}

.header-cell
{
    background-color: #00ff00;
    font-weight: bold;
}

.genap
{
    background-color: cyan;
}

.ganjil
{
    background-color: yellow;
}

</style>
</head>

<body>
    
<table>
    <tr>    
    <th>bilangan</th>
    <?php
    for ($j = 1; $j <= 10; $j++)
    {
        print "<th class='header-cell'>" . $j . "</th>";
    }
    ?>
    </tr>
    <?php
    for ($i = 1; $i <= 10; $i++)
    {
        print "<tr>";
        print "<td class='header-cell'>" . $i . "</td>";
        for ($j = 1; $j <= 10; $j++)
        {
            $hasil = $i * $j;
            if ($hasil % 2 == 0)
            {
                print "<td class='genap'>" . $hasil . "</td>";
            }
            else
            {
                print "<td class='ganjil'>" . $hasil . "</td>";
            }
        }
        print "</tr>";
    }
    ?>
</table>
</body>
</html>