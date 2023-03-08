

# First import the library
import pyrealsense2 as rs
# Import Numpy for easy array manipulation
import numpy as np
# Import OpenCV for easy image rendering
import cv2
import time
import math 
import requests

# Create a pipeline
pipeline = rs.pipeline() 

font = cv2.FONT_HERSHEY_COMPLEX

# Create a config and configure the pipeline to stream
#  different resolutions of color and depth streams
config = rs.config()

# Get device product line for setting a supporting resolution
pipeline_wrapper = rs.pipeline_wrapper(pipeline)
pipeline_profile = config.resolve(pipeline_wrapper)
device = pipeline_profile.get_device()
device_product_line = str(device.get_info(rs.camera_info.product_line))

def get_distance(x, y, depth_frame):
     depth = depth_frame.get_distance(x, y)
     return depth*100

def empty(a):
    pass

def create_depth_mask(depth_image, min_distance, max_distance):
    
    # Create a mask with the same size as the depth image
    mask = np.zeros(depth_image.shape, dtype=np.uint8)

    # Set all pixels in the mask to 1 where the depth value is within the acceptable range
    mask[(depth_image >= min_distance) & (depth_image <= max_distance)] = 1

    return mask

min_distance = 0.0
def get_max_dist(depth_image,depth_scale):
    return depth_image[320,240]*depth_scale


timedelay = 1

cv2.namedWindow("parameters")
cv2.resizeWindow("parameters",640,240)
cv2.createTrackbar("area_thres","parameters",400,3000,empty)
cv2.createTrackbar("threshold1","parameters",134,255,empty)
cv2.createTrackbar("threshold2","parameters",190,255,empty)

# scaling = int(math.sqrt(4600/144)) # == 6.09
# sq_scaling = 4600.0/144.0


found_rgb = False
for s in device.sensors:
    if s.get_info(rs.camera_info.name) == 'RGB Camera':
        found_rgb = True
        break
if not found_rgb:
    print("The demo requires Depth camera with Color sensor")
    exit(0)

config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)

if device_product_line == 'L500':
    config.enable_stream(rs.stream.color, 960, 540, rs.format.bgr8, 30)
else:
    config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# Start streaming
profile = pipeline.start(config)

# Getting the depth sensor's depth scale (see rs-align example for explanation)
depth_sensor = profile.get_device().first_depth_sensor()
depth_scale = depth_sensor.get_depth_scale()*100
print("Depth Scale is: " , depth_scale)

# # We will be removing the background of objects more than
# #  clipping_distance_in_meters meters away
# clipping_distance_in_meters = 1 #1 meter
# clipping_distance = clipping_distance_in_meters / depth_scale

# # Create an align object
# # rs.align allows us to perform alignment of depth frames to others frames
# # The "align_to" is the stream type to which we plan to align depth frames.
align_to = rs.stream.color
align = rs.align(align_to)

calibrated_pixel_cm=0
i=0
# Streaming loop
try:
    while True:
        # Get frameset of color and depth
        frames = pipeline.wait_for_frames()

        aligned_frames = align.process(frames)

        # Get aligned frames
        aligned_depth_frame = aligned_frames.get_depth_frame() # aligned_depth_frame is a 640x480 depth image
        color_frame = aligned_frames.get_color_frame()

        # Validate that both frames are valid
        if not aligned_depth_frame or not color_frame:
            continue

        depth_image = np.asanyarray(aligned_depth_frame.get_data())
        color_image = np.asanyarray(color_frame.get_data())

        threshold1= cv2.getTrackbarPos("threshold1","parameters") 
        threshold2= cv2.getTrackbarPos("threshold2","parameters")
        area_thres = cv2.getTrackbarPos("area_thres","parameters")

        # Remove background - Set pixels further than clipping_distance to grey
        # black_color = 0
        # depth_image_3d = np.dstack((depth_image,depth_image,depth_image)) #depth image is 1 channel, color is 3 channels
        # bg_removed = np.where((depth_image_3d > clipping_distance) | (depth_image_3d <= 0), black_color, color_image)
        #depth_clipped = np.where((depth_image > clipping_distance) | (depth_image < 0), 0, depth_image)
        

        # Render images:
        #   depth align to color on left
        #   depth on right
        # depth_colormap = cv2.applyColorMap(cv2.convertScaleAbs(depth_image, alpha=0.03), cv2.COLORMAP_JET)

        imgGray = cv2.cvtColor(color_image, cv2.COLOR_BGR2GRAY)
        # used for better image processing in gray scale by chatgpt
        # equalized_image = cv2.equalizeHist(imgGray)
        imgBlur= cv2.GaussianBlur(imgGray, (5,5) , 1) 

        imgCanny= cv2.Canny(imgBlur, threshold1, threshold2)
        kernel = np.ones((5,5))
        imgdil= cv2.dilate(imgCanny,kernel,iterations=2)

        contours, _ =cv2.findContours(imgCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)

        while(i<1):
            print("calibrating")
            print("keep no object in frame")
            
            calibrated_height=get_max_dist(depth_image,depth_scale)
            print("done calibrating with height = " , calibrated_height)
            
            time.sleep(2)
            print("calibrating pixel to cm ")
            print("place aruco ")
            
            j=0
            while(j<1):

                for cnt in contours:
                    area= cv2.contourArea(cnt)
                    
                    if area> area_thres:
                        peri = float(cv2.arcLength(cnt,True))
                        approx= cv2.approxPolyDP(cnt, 0.01*peri, True)
                        cv2.drawContours(color_image,[approx],0,(0,0,255),2)
                        cv2.imshow('Calibrating', color_image)
                        calibrated_pixel_cm = peri/27
                        if(calibrated_pixel_cm>0):
                            j=j+1
                # print("peri " ,peri)
                print("done calibrating with pixel to cm = " , calibrated_pixel_cm)
            i=i+1
        sq_scaling = calibrated_pixel_cm*calibrated_pixel_cm 

        for cnt in contours:

            area= cv2.contourArea(cnt)
            peri = cv2.arcLength(cnt,True)
            approx= cv2.approxPolyDP(cnt, 0.01*peri, True)

            #x = approx.ravel()[0]
            #y= approx.ravel()[1]
            
            M = cv2.moments(cnt)
            
            if area> area_thres:
                if M['m00'] != 0:
                 cx = int(M['m10']/M['m00'])
                 cy = int(M['m01']/M['m00'])
                #cv2.drawContours(frame,[approx],0,(0),5)
                if len(approx)== 3:
                    cv2.drawContours(color_image,[approx],0,(0),5)
                    cv2.putText(color_image,"Triangle",(cx,cy),font,1,(0,0,0))
                    #object_d=depth_image[cx,cy]
                    height=(calibrated_height - depth_image[cy,cx]*depth_scale)

                    print("volume :", ((area/sq_scaling)*height))
                    volume = ((area/sq_scaling)*height)
                    requests.post("http://localhost:8000/item/tool/volume",json={"volume":volume,'weight':0},headers={'Content-Type': 'application/json'})
                    print(" Sending data ...")
                    time.sleep(timedelay)
                   
                elif len(approx)== 4 :
                    rect = cv2.minAreaRect(cnt)
                    box = cv2.boxPoints(rect)
                    box = np.int0(box)
                    cv2.drawContours(color_image,[box],0,(0,0,255),2)

                    depth_mask = create_depth_mask(depth_image, min_distance, calibrated_height)
                    
                    gradient_x = cv2.Sobel(depth_mask, cv2.CV_64F, 1, 0, ksize=3)
                    gradient_y = cv2.Sobel(depth_mask, cv2.CV_64F, 0, 1, ksize=3)
                    gradient = np.sqrt(np.square(gradient_x) + np.square(gradient_y))
                    avg_gradient = np.mean(gradient)
                    std_gradient = np.std(gradient)
                    print("gradient",avg_gradient)
                    height=(calibrated_height - depth_image[cy,cx]*depth_scale)

                    if 0.46 < avg_gradient < 5:
                        print("prism")
                        cv2.putText(color_image,"prism",(cx,cy),font,1,(0,0,0))  
                        print("area",area/sq_scaling)
                        print("height",height)
                        #print("area",area)
                        print("vol",(area/sq_scaling)*height)
                        volume = (area/sq_scaling)*height
                        requests.post("http://localhost:8000/item/tool/volume",json={"volume":volume,'weight':0},headers={'Content-Type': 'application/json'})
                        print(" Sending data ...")

                    elif avg_gradient < 0.46:
                        print("Cuboid")
                        cv2.putText(color_image,"Cuboid",(cx,cy),font,1,(0,0,0))  
                        print("area",area/sq_scaling)
                        print("height",height)
                        print("peri",peri/calibrated_pixel_cm)
                        print("vol",(area/sq_scaling)*height)
                        volume = (area/sq_scaling)*height
                        requests.post("http://localhost:8000/item/tool/volume",json={"volume":volume,'weight':0},headers={'Content-Type': 'application/json'})
                        print(" Sending data ...")

                    else:
                        print("Cylinder")
                        cv2.putText(color_image,"cylinder",(cx,cy),font,1,(0,0,0))  
                        print("area",area/sq_scaling)
                        radius = height/2
                        length = (area/(sq_scaling*height))
                        vol = (3.14)*(radius)*(radius)
                        print("vol",vol)
                        volume = (3.14)*(radius)*(radius)
                        requests.post("http://localhost:8000/item/tool/volume",json={"volume":volume,'weight':0},headers={'Content-Type': 'application/json'})
                        print(" Sending data ...")
                    time.sleep(timedelay)
                    
   
                elif len(approx)>= 15 :
                    (x,y),radius = cv2.minEnclosingCircle(cnt)
                    center = (int(x),int(y))
                    radius = int(radius)
                    # print("radius",radius)
                    # print("area",area)

                    height=(calibrated_height - depth_image[cy,cx]*depth_scale)

                    cv2.circle(color_image,center,radius,(0,255,0),2)
                    # cv2.putText(frame,"Circle",(cx,cy),font,1,(0,0,0))
                      
                    depth_mask = create_depth_mask(depth_image, min_distance, calibrated_height)
                    gradient_x = cv2.Sobel(depth_mask, cv2.CV_64F, 1, 0, ksize=3)
                    gradient_y = cv2.Sobel(depth_mask, cv2.CV_64F, 0, 1, ksize=3)
                    gradient = np.sqrt(np.square(gradient_x) + np.square(gradient_y))
                    avg_gradient = np.mean(gradient)
                    # print(gradient)
                    # Check if the gradient is linear (i.e., a cylinder) or not (i.e., a sphere)
                    print(avg_gradient)
                    if (avg_gradient) < 0.40:
                        print("Cylinder")
                        print("area",area/sq_scaling)
                        print("vol",(area/sq_scaling)*height)
                        cv2.putText(color_image,"cylinder",(cx,cy),font,1,(0,0,0)) 
                        volume = (area/sq_scaling)*height
                        requests.post("http://localhost:8000/item/tool/volume",json={"volume":volume,'weight':0},headers={'Content-Type': 'application/json'})
                        print(" Sending data ...") 
                    else:
                        print("Sphere")
                        cv2.putText(color_image,"sphere",(cx,cy),font,1,(0,0,0))  
                        print("area",area/sq_scaling)
                        radius1 = math.sqrt((area/sq_scaling)/3.14)
                        vol= (4/3)*(np.pi)*(radius1**3)
                        print("vol",vol)
                        volume = (4/3)*(np.pi)*(radius1**3)
                        requests.post("http://localhost:8000/item/tool/volume",json={"volume":volume,'weight':0},headers={'Content-Type': 'application/json'})
                        print(" Sending data ...")
                    time.sleep(timedelay)


        cv2.imshow('Color Image', color_image)
        # cv2.imshow('dil', imgdil)
        # cv2.imshow('can', imgCanny)
        key = cv2.waitKey(1)
        # Press esc or 'q' to close the image window
        if key & 0xFF == ord('q') or key == 27:
            cv2.destroyAllWindows()
            break
finally:
    pipeline.stop()
