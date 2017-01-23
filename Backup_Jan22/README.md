# CS5331

 NETWORK VISUALIZATION


The Weblink is as follows:<br>
http://www.myweb.ttu.edu/vinhtngu

Major Features:

•	The project gives a network visualization of the protein network comprising of different cancer study id's which are related based on their common genes.

•	Here we have extracted the common genes among different cancer study id's after preprocessing the data from Web API of cBioportal website using python.

•	The user interface was designed using HTML, CSS, D3 and Bootstrap to help users visualize, analyze and get quick insights into common genes that relates different cancer types.

•	Firstly we have created the protien network by considering only 25 different cancer study id's.On clicking on a particular cancer study id,a parallel co-ordinate system appears representing the clinical data of the same. The clinical data is being read dynamically from the WEBAPI. In addition, the number of shared common genes between two nodes are encoded by its thickness, the more common links, the thicker the link

•	In the parallel co-ordinate system the user gets to know a lot of useful information such as PatientID,diagonsis age,treatment type,gender,operation type etc foe each cancer study id.There is slider also available in each of the vertices of the parallel co-rdinate system that gives a better view if need to concentrate and look in a particular range.

•	Also we have made sure that the colour of the nodes matches with colour of the cancer study types that are world wide accepted.

•	We have also implemented the bubble chart, here the user is allowed to click on the link connecting different cancer protiens. On clicking on  a particular link connecting two protiens, we compute the common genes that are present in both cancer study id's. After computing the common genes, the same is displayed in the form of bubble chart.

•	We have also implemented protein images in the bubble chart, here the user is allowed to click on the individual nodes or links in the cancer network. If one node in the study network is clicked, then the bubble chart shows all the proteins associated with that study as well as other related studies. If one link is clicked, then the common proteins of the 2 nodes in that link will be shown.

•	The protein images of the bubble chart are taken from this site: http://www.rcsb.org/pdb/home/home.do. Some proteins do not have any structured images yet. We show an error message for them in the bubble chart. 

•	We call each protein image with an id called PDB id. Every gene has some PDB ids. We have found a file called pdb.csv where there is a list of human genes and their PDB ids. We use this file to call images of proteins. 
