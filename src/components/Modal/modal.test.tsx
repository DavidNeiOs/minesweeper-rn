import React from "react";
import createRenderer from "react-test-renderer";

import { ModalContext } from "../../contexts/ModalContext";
import { Modal } from "./Modal";

test("Renders properly", () => {
  const tree = createRenderer
    .create(
      <ModalContext.Provider
        value={{
          hideModal: () => {},
          showModal: () => {},
          isModalShown: true,
          options: {
            title: "You win",
            message: "found all minse",
            buttonText: "new game",
            action: () => {},
            score: 143,
          },
        }}
      >
        <Modal />
      </ModalContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <Modal
      hardwareAccelerated={false}
      onRequestClose={[Function]}
      transparent={true}
      visible={true}
    >
      <View
        style={
          Object {
            "alignItems": "center",
            "backgroundColor": "rgba(0,0,0,0.7)",
            "bottom": 0,
            "justifyContent": "center",
            "left": 0,
            "position": "absolute",
            "right": 0,
            "top": 0,
          }
        }
      >
        <View
          style={
            Object {
              "opacity": 0,
              "transform": Array [
                Object {
                  "translateY": 800,
                },
              ],
              "width": "75%",
            }
          }
        >
          <View
            style={
              Object {
                "alignItems": "center",
                "backgroundColor": "#FFF",
                "borderRadius": 8,
                "justifyContent": "space-around",
                "minHeight": 168,
                "paddingHorizontal": 8,
                "paddingVertical": 16,
                "transform": Array [
                  Object {
                    "scaleX": 1,
                  },
                  Object {
                    "scaleY": 1,
                  },
                ],
                "width": "100%",
              }
            }
          >
            <View
              style={
                Object {
                  "alignItems": "center",
                  "marginBottom": 16,
                }
              }
            >
              <Text
                style={
                  Object {
                    "fontSize": 20,
                    "fontWeight": "600",
                    "marginVertical": 8,
                  }
                }
              >
                You win
              </Text>
              <Text
                style={
                  Object {
                    "fontSize": 16,
                  }
                }
              >
                found all minse
              </Text>
              <Text
                style={
                  Object {
                    "fontSize": 16,
                  }
                }
              >
                Your score is: 
                143
              </Text>
            </View>
            <View
              style={
                Object {
                  "borderRadius": 20,
                  "overflow": "hidden",
                }
              }
            >
              <View
                accessible={true}
                focusable={true}
                isTVSelectable={true}
                onClick={[Function]}
                onResponderGrant={[Function]}
                onResponderMove={[Function]}
                onResponderRelease={[Function]}
                onResponderTerminate={[Function]}
                onResponderTerminationRequest={[Function]}
                onStartShouldSetResponder={[Function]}
                style={
                  Object {
                    "opacity": 1,
                  }
                }
              >
                <View
                  style={
                    Object {
                      "backgroundColor": "dodgerblue",
                      "borderColor": "navy",
                      "borderRadius": 20,
                      "borderWidth": 3,
                      "paddingHorizontal": 16,
                      "paddingVertical": 6,
                    }
                  }
                >
                  <Text
                    style={
                      Object {
                        "color": "#FFF",
                        "fontSize": 18,
                        "textTransform": "uppercase",
                      }
                    }
                  >
                    new game
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  `);
});
