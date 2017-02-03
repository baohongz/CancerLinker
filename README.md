# CancerMapper: Interactive Explorations of Cancer Network 

![ScreenShot](https://github.com/iDataVisualizationLab/CancerNetwork/blob/master/images/TeaserImage.png)

Major Features:
Try  [Web demo](http://myweb.ttu.edu/vinhtngu/cancermapper/)

Try Cancer Mapper [Video demo](https://www.youtube.com/embed/ioyaTPani4A).

• The project gives a network visualization of the protein network comprising of different cancer study id's which are related based on their common genes.

• Here we have extracted the common genes among different cancer study id's after preprocessing the data from Web API of cBioportal website using python.

• The user interface was designed using HTML, CSS, D3 and Bootstrap to help users visualize, analyze and get quick insights into common genes that relates different cancer types.

• Firstly we have created the protien network by considering only 26 different cancer study id's.On clicking on a particular cancer study id,a parallel co-ordinate system appears representing the clinical data of the same. The clinical data is being read dynamically from the WEBAPI. In addition, the number of shared common genes between two nodes are encoded by its thickness, the more common links, the thicker the link

• In the parallel co-ordinate system the user gets to know a lot of useful information such as PatientID,diagonsis age,treatment type,gender,operation type etc foe each cancer study id.There is slider also available in each of the vertices of the parallel co-rdinate system that gives a better view if need to concentrate and look in a particular range.


• We have also implemented the bubble chart, here the user is allowed to click on the link connecting different cancer protiens. On clicking on a particular link connecting two proteins, we compute the common genes that are present in both cancer study id's. After computing the common genes, the same is displayed in the form of bubble chart.

• We have also implemented biological assembly in the bubble chart, when the user clicks on a specific node or link, then the bubble chart shows all the proteins associated with that study as well as other related studies. If one link is clicked, then the common proteins of the 2 nodes in that link will be shown. User also has the option to view protein by its name or by its biological assembly

• The protein images of the bubble chart are taken from this site: http://www.rcsb.org/pdb/home/home.do. Pdb Id was collected from in internet with approximately 15000 records. 

# References: 
[1] Vehlow et al. *Visual Analysis of Biological Data-Knowledge Networks*. This paper proposes the application of degree-of-interest functions to filter dense biological networks. 
[Video](https://www.youtube.com/watch?v=yeJaSYkA0-Q)

[2] Ham and Perer *Search, Show Context, Expand on Demand* introduced the concept of jumpstarting a network exploration with an initial search and then expanding the resulting network interactively step by step.
[PDF](http://perer.org/papers/adamPerer-DOIGraphs-InfoVis2009.pdf)
