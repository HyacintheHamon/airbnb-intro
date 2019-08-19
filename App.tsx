import React from "react";
import {
  StyleSheet, View, ScrollView, Text,
} from "react-native";

import { downloadImagesAsync } from "./components/Images";
import Home from "./components/Home";
import Tabbar from "./components/Tabbar";
import Intro from "./components/Intro";

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Step {
  x: number;
  y: number;
  label: string;
}
interface AppProps {}
interface AppState {
  ready: boolean;
  steps: Step[] | null;
}

const measure = async (ref: View | Text | ScrollView): Promise<Position> => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y, width, height,
})));

export default class App extends React.Component<AppProps, AppState> {
  home = React.createRef();

  state = {
    ready: false,
    steps: null,
  };

  async componentDidMount() {
    this.setState({ ready: true });
  }

  measure = async () => {
    const explore = measure(this.home.current.explore.current);
    const city = measure(this.home.current.city.current);
    const cities = measure(this.home.current.cities.current);
    const measures = await Promise.all([explore, city, cities]);
    const steps = [{
      x: 50,
      y: 50,
      label: "Explore what the app has to offer. Choose between homes, experiences, restaurants, and more.",
    }, {
      x: 80,
      y: 80,
      label: "Find the best accomodation in your favorite city.",
    },
    {
      x: 100,
      y: 100,
      label: "Explore the most popular cities.",
    }];
    this.setState({ steps });
  };

  render() {
    const { ready, steps } = this.state;
    return (
      <View style={styles.container}>
        <Home ref={this.home} onLoad={this.measure} />
        <Tabbar />
        {
          steps && (
            <Intro {...{ steps }} />
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
