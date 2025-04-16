import Book from '../models/book.js'

// create the new book entry
export const createBook = async (req, res) => {

    try {
        console.log(req.body);

        const { book_price, book_name } = req.body;

        const existingBook = await Book.findOne({ where: { book_name } });
        if (existingBook) {
            res.status(400).json({ error: "Book is already exist" });
        }
        const result = await Book.create({ book_name, book_price });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

// get all book record
export const getAllBooks = async (req, res) => {
    try {
        const result = await Book.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

// delete book record
export const deleteBook = async (req, res) => {
    try {
      const { id } = req.params; // ID from the URL

      if (!id) {
        return res.status(400).json({ error: "Book ID is required" });
      }
  
      const book = await Book.findByPk(id); 
  
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      await book.destroy();
      res.status(200).json({ message: "Book deleted successfully" });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // update book record
  export const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { book_name, book_price } = req.body;
  
      if (!id) {
        return res.status(400).json({ error: "Book ID is required" });
      }
  
      const book = await Book.findByPk(id); // or use findOne({ where: { book_id: id } });
  
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      // Update fields
      book.book_name = book_name || book.book_name;
      book.book_price = book_price || book.book_price;
  
      await book.save();
  
      res.status(200).json({
        message: "Book updated successfully",
        data: book,
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };