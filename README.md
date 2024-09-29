Created by Chelsea Lianne Gomez, Naing Lynn Kyaw, and Johnnessa Barroquillo for sunhacks 2024

## Inspiration
We were inspired by the dedicated nurses who handle numerous responsibilities every day. Our goal was to streamline data management, allowing them to allocate their time and energy more efficiently, while ensuring that every patient receives the care they need.

## What it does
Nurse Assist aims to revolutionize patient monitoring by integrating health sensors and a powerful database, creating a centralized hub for real-time health data. These compact sensors continuously track critical metrics like heart rate and temperature. This data is uploaded to a database, updating in real time which ensures that healthcare professionals have immediate access to the information they need. 

Through an intuitive web platform, medical staff can log in to view a dashboard of their patients. They can add new patients and assign priority levels, ensuring that those needing urgent care receive prompt attention through automatic sorting by priority. By streamlining data management and enhancing communication, our system aims to empower healthcare providers to deliver more efficient and effective care, ultimately improving patient outcomes.

## How we built it

We used the Flask framework to handle our back-end processes and used React for our front-end display. We created different routes for the different functions that our front-end would connect to, such as multiple functions for managing patients (adding, deleting, updating), and displaying the whole database in our application. All our data was stored and updated using MySQL, with each patient having a unique ID number. We also used a Raspberry Pi to connect our sensors to our back-end. 

## Challenges we ran into
We faced a lot of challenges when making this project. Firstly, most of our members were newer to hackathons and our team was trying new things so there was a steep learning curve. We had to do a lot of research during the 24 hours.  Additionally, it was also difficult working with such fragile and sensitive hardware, and in the end, a part unfortunately got broken during testing. Alongside hardware troubles, several members of our team also had issues running environments on their computers, leading to setbacks in our progress.

## Accomplishments that we're proud of
We’re proud of our working prototype desipe the hardships we faced. All the features are fully functional, such as adding a patient, changing priority and sorting the table, updating a patient’s last measured vitals, and deleting a patient from the table. We’re also proud of the clean UI UX design and the usability from a customer’s perspective.

## What we learned
As our team comprised of mostly new hackers, everyone in our team learned something valuable. All our members were trying something new from designing the  front-end to ensuring the functionality of the back-end. For example, working with MySQL and sensors was a new experience for the members working in the backend. One of our members also learned how to use GitHub to work alongside the team. Another learning experience was developing a work flow as a team so that we could work together towards our shared vision.

## What's next for Nurse Assist
One next possible step are to display what patients need to be checked according to the time last checked to ensure that all patients are checked within an appropriate amount of time. Another next step for this project would be to get better quality sensors since we know what we are looking for now. 
