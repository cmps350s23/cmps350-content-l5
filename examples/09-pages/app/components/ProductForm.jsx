"use client"
import { useRef, useState } from "react"

const ProductForm = () => {
  // Using useState
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: 0,
    category: "",
    tags: [],
    quantity: 0,
  })

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const tagRef = useRef()

  const handleTags = () => {
    const tags = tagRef.current.value.split(",")
    setProduct((prev) => ({ ...prev, tags: [...prev.tags, ...tags] }))
  }

  const handleRemoveTag = (tag) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleIncrease = () => {
    setProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
  }

  const handleDecrease = () => {
      setProduct((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(JSON.stringify(product))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type="text"
          name="title" id="title"
          onChange={handleChange}
          placeholder="Title"
        />
        <label htmlFor='desc'>Description</label>
        <input
          type="text"
          name="desc" id="desc"
          onChange={handleChange}
          placeholder="Description"
        />
        <label htmlFor='price'>Price</label>
        <input
          type="number"
          name="price" id="price"
          onChange={handleChange}
          placeholder="Price"
        />
        <label htmlFor='category'>Category</label>
        <select name="category" id="category" onChange={handleChange}>
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <label htmlFor='tags'>Tags</label>
        <span className="grid-2cols">
          <textarea
            ref={tagRef} id="tags"
            placeholder="Seperate tags with commas..."
          ></textarea>
          <button type="button" onClick={handleTags}>
            Add Tags
          </button>
        </span>
        <div className="tags">
          {product.tags.map((tag) => (
            <small key={tag} onClick={() => handleRemoveTag(tag)}>
              {tag}
            </small>
          ))}
        </div>
        <br />
        <div className="quantity">
          <button type="button" onClick={handleDecrease}>
            -
          </button>
          <span>Quantity ({product.quantity})</span>
          <button type="button" onClick={handleIncrease}>
            +
          </button>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {JSON.stringify(product)}
      </div>
    </>
  )
}

export default ProductForm