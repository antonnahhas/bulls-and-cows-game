package hac.javareact;

import com.google.gson.Gson;
import hac.javareact.exceptions.MissingOperandException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

/**
 * This API endpoint (an endpoint is a function exposed by an API) receives name and score , return list of top 5 scores.
 */
@WebServlet(name = "ServletApi", value = "/highscores")
public class ApiServlet extends HttpServlet {


  
    //private static final String FILENAME = "/path/to/highscores.dat";//TODO
    private static final String SCORES = "scores.dat";
    private static final String NAME = "name";
    private static final String SCORE="score";

    //-----------------------------------------------------------------------------------
    /**
     * Handles a GET request for this servlet -  It loads the current scores list from the data file,
     * and returns the names of the lowest 5 scores
     * <br/>
     * @param request data of the incoming request from the client
     * @param response provides tools to handle the compilation of the response and sending it to the client
     * @throws IOException may be thrown if sending data to the client fails for some reason.
     */

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {



        response.setHeader("Access-Control-Allow-Origin", "*");


        // Load the current scores from the data file
        List<Score> scores = null;
        try {
            scores = loadScores();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        // Sort the scores by score in ascending order
        Collections.sort(scores, new Comparator<Score>() {
            @Override
            public int compare(Score o1, Score o2) {
                return o1.getScore() - o2.getScore();
            }
        });

        // Get the names of the lowest 5 scores
        List<Score> lowestNames = new ArrayList<>();
        for (int i = 0; i < Math.min(scores.size(), 5); i++) {
            lowestNames.add(scores.get(i));
        }

        // Send the names as a JSON response
        response.setContentType("application/json");
        response.getWriter().write(convertToJson(lowestNames));

    }
      /**
     * Validates that all required parameters are received. If any additional parameters are received,
     * they do not matter, and we will ignore them.
     * If validation passes the function will finish with no effect. If validation fails, an exception will
     * be thrown.
     * <br/>
     * @param parameterMap a map of parameter names to arrays of values
     * @throws MissingOperandException if any of the required parameters is missing
     */
    private void validateParameters(Map<String, String[]> parameterMap) throws MissingOperandException {
        if (!parameterMap.containsKey(NAME) || !parameterMap.containsKey(SCORE)) {
            throw new MissingOperandException(NAME, SCORE);
        }
    }


   /**
     * Handles a POST request for this servlet. It receives a name and a score as  parameters,
     * validates them, and adds a new score to the list of scores in the data file. If there is an error with the input
     * parameters, the function will return  error message.
     *
     * @param request  the HTTP request object containing the request parameters
     * @param response the HTTP response object that will be used to send the response back to the client
     * @throws IOException     if there was an error reading from or writing to the data file or response output stream
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");

        String name = request.getParameter(NAME);
        int score = Integer.parseInt(request.getParameter(SCORE));



        try {
            validateParameters(request.getParameterMap());
            if(name.isEmpty()){
                throw new IllegalArgumentException("Please provide a name");
            }
            // Load the current scores from the data file
            List<Score> scores = null;
            try {
                scores = loadScores();
            } catch (ClassNotFoundException e) {
                throw new RuntimeException(e);
            }

            for (Score score1 : scores) {
                if (score1.getName().equals(name)) {
                    throw new IllegalArgumentException("Name already exists");
                }
            }
            // Add the new score to the list
            scores.add(new Score(name, score));

            // Save the updated scores to the data file
            saveScores(scores);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Score added successfully");

        }
        catch (IllegalArgumentException | MissingOperandException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(e.getMessage());
        }


    }
     /**
     * This function loads the scores from the data file into a List .
     * If the file does not exist,an empty list will be returned.
     *
     * @return a List of Score objects representing the scores in the data file
     * @throws IOException            if there was an error reading from the data file
     * @throws ClassNotFoundException if the Score class could not be found while deserializing the data file
     */
    private List<Score> loadScores() throws IOException, ClassNotFoundException {
        File scoresFile = new File(getServletContext().getRealPath("/") + SCORES);
        List<Score> scores;
        if (scoresFile.exists()) {
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(scoresFile))) {
                scores = (List<Score>) ois.readObject();
            }
        } else {
            scores = new ArrayList<>();
        }



        return scores;
    }

    //-----------------------------------------------------------------------------------
     /**
     * This function saves a list of Score objects to the data file. If the file does not exist, it will be created.
     *
     * @param scores a List of Score objects representing the scores to be saved to the data file
     * @throws IOException if there was an error writing to the data file
     */
    private void saveScores(List<Score> scores) throws IOException {
        File scoresFile = new File(getServletContext().getRealPath("/") + SCORES);
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(scoresFile))) {
            oos.writeObject(scores);
        }
    }

    //-----------------------------------------------------------------------------------
     /**
     * This function takes a list and converts it to a JSON string representation.
     *
     * @param scores a List of objects representing the scores
     * @return a JSON string representation of the scores
     */
    private String convertToJson(List<Score> scores) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (Score score : scores) {
            sb.append("{");
            sb.append("\"name\":\"").append(score.getName()).append("\",");
            sb.append("\"score\":").append(score.getScore());
            sb.append("},");
        }
        if (scores.size() > 0) {
            sb.deleteCharAt(sb.length() - 1); // Remove the last comma
        }
        sb.append("]");
        return sb.toString();
    }

    //-----------------------------------------------------------------------------------
    
    /**
     * This is class representing a Score object. It has a name and a score
     */
    private static class Score implements Serializable {
        private String name;
        private int score;

        public Score(String name, int score) {
            this.name = name;
            this.score = score;
        }

        public String getName() {
            return name;
        }

        public int getScore() {
            return score;
        }
    }

    //-----------------------------------------------------------------------------------
   
}
