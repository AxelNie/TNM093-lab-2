/**
  Computer exercise for TNM093
  Course responsible: Alexander Bock
  Created by: Kahin Akram
  August 2020
 */
queue()
    .defer(d3.csv, 'data/socialScience.csv')
    .await(draw);

var sp, pc, info;

function draw(error, data)
{
    if (error) throw error;

    sp = new sp(data);
    pc = new pc(data);
    info = new info(data);
}
