import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const Videos: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null); // State to manage the selected video ID

  // Function to handle video button press
  const handleVideoPress = (id: string) => {
    setVideoId(id); // Set the video ID to play
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>First Aid Videos</Text>
      <Text style={styles.description}>
        Watch these videos to learn how to provide first aid in case of an emergency.
      </Text>

      {/* Video Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleVideoPress('NcZ2UrbSMns')} // Pass the YouTube video ID
      >
        <Text>Video 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleVideoPress('another_video_id')} // Pass another YouTube video ID
      >
        <Text>Video 2</Text>
      </TouchableOpacity>

      {/* YouTube Video Player */}
      {videoId && (
        <View style={styles.videoContainer}>
          <YoutubeIframe
            height={200}
            width={300}
            videoId={videoId} // YouTube video ID
            play={true} // Autoplay the video
            onChangeState={(event) => {
              if (event === 'ended') {
                Alert.alert('Video Ended', 'The video has finished playing.');
              }
            }}
            onError={(error) => Alert.alert('Error', 'Failed to load video')}
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    margin: 8,
    padding: 8,
    backgroundColor: '#f4f4f9',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d32f2f',
    alignItems: 'center',
  },
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Videos;