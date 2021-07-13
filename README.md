# MSEngage21_VC

## WEBSITE
[link](https://teamsclone21.herokuapp.com/)

## PROBLEM STATEMENT
As a part of Microsoft Engage program 2021, the task was to implement a clone of Microsoft Teams with a minimum ask that atleast 2 people should be able to connect to have a video conversation. 

## Technological Stack Used
- Framework & Languages : ReactJs, HTML, CSS, JavaScript, JSX
- APIs & SDKs :
  - Twilio programmable video for video calling
  - Twilio programmable chat for text chat

## Agile Methodology
I executed the project in 4 sprints, each of 1 week. Each sprint had design, build and testing phase. Feedback from both mentors and testing was considered while planning the sprint.
- SPRINT 1 (14/06/21 - 20/06/21)
  - AGENDA: Research on tech-stack, APIs, SDKs & work over design
- SPRINT 2 (21/06/21 - 27/06/21)
  - AGENDA: Implement video calling feature along with few basic features of mic, video on/off. Deploy this product.
- SPRINT 3 (28/06/21 - 04/07/21)
  - AGENDA: Research methods to implement advanced features like screen sharing & blur background.
- SPRINT 4 (05/07/21 - 12/07/21)
  - AGENDA: Familiarised with Twilio programmable chat API & implement text chat feature. Imporve and finalise the project.

## Unique Features 
1. Chat Accessibility : 
  - Text chats are accessible both pre and post video call
  - Messages from outside the video call are visible inside and also the otherwise.
2. Joining Options :
  - User can choose to join video call with either video/mic on or off.
3. Blur Background :
  - Blur the background in your video
4. Dominant Speaker :
  - Border of participant speaking is highlighted in green color
5. Video Resizing :
  - Videos in video chat resize themselves to have equal size depending on the people in the call
6. Display Preview :
  - Before joining video chat user is displayed the a live video stream

## Features

- Text Chat
1. Create & Join : Every user can create & join a meeting channel
2. Unique Code : Each meeting has a unique code for identification
3. Dashboard : Each user has their own dashboard of meetings they’ve joined.
4. Switch Meeting : User can switch between meetings she has joined.
5. Current Meeting : In the meetings list current meeting is highlighted
6. Chat : Users can share messages with everyone in the meeting.
7. Chat Accessibility : Chats are accessible both pre and post video calls.
8. Chat Continuity : Text chat from outside the video call continues inside the call.
9. Switch to Video : Switch to a video call related to that meeting.
10. Participants List : Displays list of people who’ve joined a meeting.
11. Auto scroll on a new message
12. Number of Participants : Upto a 1000 participants can join a meeting channel
            
- Video Chat
1. Preview : Before joining for a video call users can preview their video stream.
2. Joining options: Users can choose to join with video and microphone switched on or off.
3. Text Chat : There is sync in the text chat outside the video and inside, so that someone who is not in the video chat can text to those in video chat and vice versa. Also the meeting’s messages are accessible anytime, be it pre, post or during the video chat.
4. Video option : Users can turn their video on / off
5. Microphone option: Users can turn the microphone on/off
6. Invite others : On clicking, a dialog box appears with an option to copy meeting code to clipboard inorder to share it with others.
7. Share Screen : Video call participants can share their screen with everyone in the call.
8. Pin shared screen : On clicking the shared screen, all the participants' video is hidden and only the screen shared is displayed at large.
9. Blur Background : Don’t want others to see what's happening behind you? Just turn on the background blur to literally blur everything in your video stream but your human body.
10. Dominant Speaker : Whenever a participant starts speaking, her video borders change color to green to let other participants know who’s speaking.
11. Video Resizing : in order to accommodate each participant’s video the videos resize and arrange themselves to have equal sizes
12. Logout : User can log off from the video chat and go back to the meeting dashboard
13. Number of participants : Twilio programmable video can accommodate upto 50 video participants in a meeting.
             
● UI/UX
1. Responsive Icons : Icons in the application are responsive to the current status of the functionality they associate to. For example icons change if you choose to turn on/off your video.
2. Intuitive Positioning : Each icon is placed at the best place where a user thinks of finding it.
3. Animated Buttons : Connect / Host buttons come up on hover
4. Tooltip : Icons have tooltips for users to better understand their use.
5. Current Meeting : Name of the current meeting is highlighted under “your meetings” tab and is also displayed on the header.
 
   
