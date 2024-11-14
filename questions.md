Q1. How long did you spend on the coding test? 
    I spent approximately 4-5 hours on the coding test. My focus was on ensuring that the core 
    functionality was implemented effectively and that the code was organized, readable, and 
    maintainable. Additionally, I allocated time to enhance the user interface for a smoother user 
    experience and to thoroughly test the application to confirm that all features worked as expected. 


Q2. What was the most useful feature that was added to the latest version of your 
chosen language? Please include a snippet of code that shows how you've used 
it. 
    One of the most useful features added to JavaScript in recent updates is the optional chaining 
    operator (?.). This operator allows developers to access deeply nested object properties without 
    having to check each level for null or undefined, making the code cleaner and reducing potential 
    runtime errors. 
    In my project, optional chaining was particularly helpful for safely accessing nested properties in task 
    data without needing multiple if checks. For example, if a task might have optional properties such 
    as details or dueDate, optional chaining ensures these accesses won't throw an error if a 
    property is undefined. 
    const task = {  
    title: "Task 1",  
    details: { 
    description: "This is a sample task", priority: "High", 
    },  
    };  
    console.log(task?.details?.description);  
    console.log(task?.dueDate?.toLocaleDateString());  


Q3. How would you track down a performance issue in production? Have you ever 
had to do this? 
    As an undergraduate, I haven't had direct experience tracking down performance issues in a 
    production environment yet. However, I have been developing my skills and understanding 
    of performance optimization on smaller-scale projects. I know that in real-world applications, 
    tools like Chrome DevTools, Lighthouse, and React Profiler play a significant role in 
    identifying areas that slow down applications. In my projects, I've used DevTools to inspect 
    and optimize component rendering and loading times. I’m also familiar with techniques like 
    code-splitting, lazy loading, and caching, which I look forward to applying in a production 
    setting. I’m eager to gain hands-on experience in managing performance issues and 
    improving user experience for complex applications. 


Q4. If you had more time, what additional features or improvements would you 
consider adding to the task management application? 
    If I had more time, the 5 most useful features I would consider adding to the task 
    management application are: 
    1. User Authentication and Role Management: Adding user authentication (using 
    JWT or OAuth) would allow users to manage their tasks individually, creating a 
    personalized experience. Roles like Admin, User, and Guest could provide different 
    access levels. 
    2. Task Collaboration: Allowing users to share tasks, assign them to others, and leave 
    comments would make the app more collaborative, enabling teams to work together 
    more effectively. 
    3. Task Notifications: Implementing real-time notifications would keep users informed 
    about task updates, upcoming deadlines, or changes made by collaborators, improving 
    task tracking. 
    4. Drag-and-Drop Task Management: Introducing drag-and-drop functionality for 
    task organization would provide a more intuitive and flexible way for users to manage 
    their tasks within categories like to-do, in progress, and completed. 
    5. Task Prioritization and Reminders: Adding advanced task prioritization (e.g., 
    urgent, important) and automated reminders would help users stay on top of critical 
    tasks and deadlines more effectively. 