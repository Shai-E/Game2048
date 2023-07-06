// export const fetchNavigationFiles = () => {
//   const fetchFilesData = async () => {
//     try {
//       const folderPath = __dirname + '/navigation'; // Update the folder path accordingly
//       const response = await fetch(folderPath);
//       const fileDataPromises = response
//         .split('\n')
//         .filter(file => file.endsWith('.js'))
//         .map(async fileName => {
//           const fileContent = await fetch(`${folderPath}/${fileName}`).then(
//             res => res.text(),
//           );
//           return {name: fileName, content: fileContent};
//         });
//       const filesData = await Promise.all(fileDataPromises);
//       return filesData;
//     } catch (error) {
//       console.error('Error fetching file data:', error);
//     }
//   };
//   return fetchFilesData();
// };
